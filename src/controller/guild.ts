import { BlizzardCharacter, Roster } from 'entity/roster.models'
import { connectionToPostgres } from '../connection/connection-to-postgres'
import Character from '../entity/character'
import { Profile } from '../entity/profile.models'
import { BlizzardController } from './blizzard'

class GuildController {
  get levelMax () {
    return 120
  }

  public async getRoster () {
    return new Promise((resolve, reject) => {
      connectionToPostgres.then(async connection => {
        const characters: Character[] = await connection.getRepository(Character).find()
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
      for await (const member of roster.members) {
        if (member.character.level === this.levelMax) {
          guildRoster.push(await this.setCharacter(member.character, blizzardController))
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
    try {
      const profile: Profile = await blizzardController.getCharacterProfile(blizzardCharacter.realm.slug, blizzardCharacter.name.toLocaleLowerCase()) as Profile
      const characterProfile = new Character()
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
      console.error(error)
    }
  }
}

export { GuildController }
