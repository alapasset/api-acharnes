import { BlizzardCharacter, Roster } from 'entity/roster.models'
import { connectionToPostgres } from '../connection/connection-to-postgres'
import Character from '../entity/character'
import { Profile } from '../entity/profile.models'
import { BlizzardController } from './blizzard'

class GuildController {
  get levelMax () {
    return 50
  }

  getRank (rankName: string) {
    switch (rankName) {
      case 'gm':
        return 0
      case 'cogm':
        return 1
      case 'recruteur':
        return 2
      case 'officier':
        return 4
      case 'veteran':
        return 5
      case 'champion':
        return 6
      case 'recrue':
        return 7
      case 'retaite':
        return 8
      default:
        return -1
    }
  }

  public async getRoster (rankName: string) {
    return new Promise((resolve, reject) => {
      connectionToPostgres.then(async connection => {
        const characters: Character[] = await (rankName ? connection.getRepository(Character).find({ where: { rank: this.getRank(rankName) } }) : connection.getRepository(Character).find())
        resolve(characters)
      }).catch(error => {
        console.error(error)
      })
    }).catch(error => {
      console.error(error)
    })
  }

  public async updateRoster () {
    try {
      const blizzardController: BlizzardController = new BlizzardController()
      const roster: Roster = (await blizzardController.getGuildRoster()) as Roster
      const guildRoster: Character[] = []
      for (const member of roster.members) {
        if (member.character.level === this.levelMax) {
          const character = await this.setCharacter(member.character, blizzardController)
          character.rank = member.rank
          guildRoster.push(character)
        }
      }
      connectionToPostgres.then(async connection => {
        try {
          await connection.createQueryBuilder()
            .insert()
            .into(Character)
            .values(guildRoster)
            .onConflict('("idBlizzard") DO UPDATE SET "name" = excluded."name", "level" = excluded."level", "class" = excluded."class", "race" = excluded."race", "lastConnexion" = excluded."lastConnexion"')
            .execute()
          return guildRoster
        } catch (error) {
          console.error(error)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  private async setCharacter (blizzardCharacter: BlizzardCharacter, blizzardController: BlizzardController): Promise<Character> {
    const characterProfile = new Character()
    try {
      const profile: Profile = await blizzardController.getCharacterProfile(blizzardCharacter.realm.slug, blizzardCharacter.name.toLocaleLowerCase()) as Profile
      characterProfile.idBlizzard = profile.id
      characterProfile.name = profile.name
      characterProfile.level = profile.level
      characterProfile.class = profile.character_class.name
      characterProfile.race = profile.race.name
      characterProfile.lastConnexion = new Date(profile.last_login_timestamp)
      characterProfile.vh = 0
      characterProfile.gapOfVhSinceLastWeek = 0
      return characterProfile
    } catch (error) {
      if (error.response.data.type === 'BLZWEBAPI00000404') {
        characterProfile.idBlizzard = blizzardCharacter.id
        characterProfile.name = blizzardCharacter.name
        characterProfile.level = blizzardCharacter.level
        characterProfile.class = '?'
        characterProfile.race = '?'
        characterProfile.lastConnexion = new Date(0)
        characterProfile.vh = 0
        characterProfile.gapOfVhSinceLastWeek = 0
        return characterProfile
      } else {
        console.error(error)
      }
    }
  }
}

export { GuildController }
