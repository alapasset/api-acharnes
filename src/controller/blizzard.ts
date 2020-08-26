import { Request, Response } from 'express';
import BattleNetWrapper from '../connection/ConnectionToBlizzardApi';

class BlizzardController {

  public async getGuildRoster(req: Request, res: Response) {
    const bnw = new BattleNetWrapper();
    const data = await bnw.apiCall(`/data/wow/guild/${bnw.realmSlug}/${bnw.guildSlug}/roster`, 'Erreur lors de la récupération du roster');
    res.json(data)
  }

  public async getGuildActivity(req: Request, res: Response) {
    const bnw = new BattleNetWrapper();
    const data = await bnw.apiCall(`/data/wow/guild/${bnw.realmSlug}/${bnw.guildSlug}/activity`, 'Erreur lors de la récupération de l\'activité');
    res.json(data)
  }
  public async getGuildAchievements(req: Request, res: Response) {
    const bnw = new BattleNetWrapper();
    const data = await bnw.apiCall(`/data/wow/guild/${bnw.realmSlug}/${bnw.guildSlug}/achievements`, 'Erreur lors de la récupération des haut-faits de guilde');
    res.json(data)
  }
  public async getCharacterProfile(req: Request, res: Response) {
    const bnw = new BattleNetWrapper();
    const data = await bnw.apiCall(`/profile/wow/character/${bnw.realmSlug}/${req.params.username}`, 'Erreur lors de la récupération du profile d\'un joueur');
    res.json(data)
  }
  public async getCharacterPvp(req: Request, res: Response) {
    const bnw = new BattleNetWrapper();
    const data = await bnw.apiCall(`/profile/wow/character/${bnw.realmSlug}/${req.params.username}/pvp-summary`, 'Erreur lors de la récupération du profile PvP d\'un joueur');
    res.json(data)
  }
}

export { BlizzardController };

