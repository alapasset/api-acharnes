export interface Roster {
  _link: {
      self: Href
  }
  guild: Guild
  members: BlizzardMember[]
}

export interface BlizzardMember {
  character: BlizzardCharacter
}

export interface BlizzardCharacter {
  key: Href
  name: string
  id: number
  realm: Realm
  level: number
  playable_class: PlayableClass
  playable_race: PlayableRace

}

interface PlayableClass {
  key: Href
  id: number
}


interface PlayableRace {
  key: Href
  id: number
}

interface Guild {
  key: Href
  name: string
  id: number
  realm: Realm
  faction: Faction
}

interface Realm {
  key : Href
  name: string
  id: number
  slug: string
}

interface Faction {
  type: string
  name: string
}

interface Href {
  href: string
}
