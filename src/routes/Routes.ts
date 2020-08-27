import express, { Request, Response } from "express"
import { BlizzardController } from "../controller/blizzard"
import { GuildController } from "../controller/guild"

class Routes {

  private BlizzardController: BlizzardController
  private GuildController: GuildController

  constructor() {
    this.BlizzardController = new BlizzardController()
    this.GuildController = new GuildController()
  }

  public routes(app: express.Application): void {
    app.route('/')
      .get((request: Request, response: Response) => {
        response.status(200).send({ message: "Bienvenue sur l'API des décrépits acharnés" })
      })

    app.route('/blizzard/guild/roster')
    .get(async (req, res) => {
      res.json(await this.BlizzardController.getGuildRoster())
    })
    app.route('/blizzard/guild/achievements')
    .get(async (req, res) => {
      res.json(await this.BlizzardController.getGuildAchievements())
    })
    app.route('/blizzard/guild/activity')
    .get(async (req, res) => {
      res.json(await this.BlizzardController.getGuildActivity())
    })

    app.route('/blizzard/character/:realm/:username/profile')
    .get(async (req, res) => {
      res.json(await this.BlizzardController.getCharacterProfile(req.params.realm, req.params.username))
    })
    app.route('/blizzard/character/:realm/:username/pvp')
    .get(async (req, res) => {
      res.json(await this.BlizzardController.getCharacterPvp(req.params.realm, req.params.username))
    })
    app.route('/blizzard/character/:realm/:username/encounters')
    .get(async (req, res) => {
      res.json(await this.BlizzardController.getCharacterEncounters(req.params.realm, req.params.username))
    })

    app.route('/guild/roster')
    .get(async (req, res) => {
      const characters = await this.GuildController.getRoster()
      console.log(characters)
      res.json(characters)
    })
    .put(async (req, res) => {
      res.json(await this.GuildController.updateRoster())
    })

  }
}

export { Routes }

