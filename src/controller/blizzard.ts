import BattleNetWrapper from '../connection/ConnectionToBlizzardApi';

class BlizzardController {
  private bnw: BattleNetWrapper;

  static get realmSlug () {
    return 'conseil-des-ombres';
  }

  static get guildSlug () {
    return 'les-décrépits-acharnés';
  }

  static get APIParams () {
    return {
      clientId : '857d2ae231584258a032a0beecccc401',
      clientSecret: 'nF1olK75acTT9vgjEPgjG4ZshB2uzrBD',
      locale: 'fr_FR',
      region: 'eu'
    }
  }

  constructor() {
    this.bnw = new BattleNetWrapper(
      BlizzardController.APIParams.clientId,
      BlizzardController.APIParams.clientSecret,
      BlizzardController.APIParams.locale,
      BlizzardController.APIParams.region
    );
  }

  public getGuildRoster = async () => {
    return await this.bnw.apiCall(`/data/wow/guild/${BlizzardController.realmSlug}/${BlizzardController.guildSlug}/roster`, 'Erreur lors de la récupération du roster');
  }
  public getGuildActivity = async () => {
    return await this.bnw.apiCall(`/data/wow/guild/${BlizzardController.realmSlug}/${BlizzardController.guildSlug}/activity`, 'Erreur lors de la récupération de l\'activité');
  }
  public getGuildAchievements = async () => {
    return await this.bnw.apiCall(`/data/wow/guild/${BlizzardController.realmSlug}/${BlizzardController.guildSlug}/achievements`, 'Erreur lors de la récupération des haut-faits de guilde');
  }
  public getCharacterProfile = async (realm: string, username: string) => {
    return await this.bnw.apiCall(`/profile/wow/character/${realm}/${username}`, 'Erreur lors de la récupération du profile d\'un joueur');
  }
  public getCharacterPvp = async (realm: string, username: string) => {
    return await this.bnw.apiCall(`/profile/wow/character/${realm}/${username}/pvp-summary`, 'Erreur lors de la récupération du profile PvP d\'un joueur');
  }
  public getCharacterEncounters = async (realm: string, username: string) => {
    return await this.bnw.apiCall(`/profile/wow/character/${realm}/${username}/encounters/raids`, 'Erreur lors de la récupération des rencontres PvP d\'un joueur');
  }
  public linkApiCall = async (url: string) => {
    return await this.bnw.linkApiCall(url, 'Erreur lors de la récupération des données liées');
  }
}

export { BlizzardController };
