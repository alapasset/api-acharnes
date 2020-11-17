export interface Profile {
  _link: {
    self: Href
  }
  id: number
  name: string
  gender: {
    type: string
    name: string
  }
  race: {
    key: Href
    name: string
    id: number
  }
  character_class: {
    key: Href
    name: string
    id: number
  }
  active_spec: {
    key: Href
    name: string
    id: number
  }
  realm: Realm
  guild: Guild
  level: number
  experience: number
  achievement_points: number
  achievements: Href
  titles: Href
  pvp_summary: Href
  encounters: Href
  media: Href
  last_login_timestamp: number
  average_item_level: number
  equipped_item_level: number
  specializations: Href
  statistics: Href
  mythic_keystone_profile: Href
  equipment: Href
  appearance: Href
  collections: Href
  active_title: {
    key: Href
    name: string
    id: number
    display_string: string
  },
  reputations: Href
  quests: Href
  achievements_statistics: Href
  professions: Href
}

interface Guild {
  key: Href
  name: string
  id: number
  realm: Realm
  faction: Faction
}

interface Realm {
  key: Href
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
