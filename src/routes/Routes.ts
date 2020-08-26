import express, { Request, Response } from "express"
import { BlizzardController } from "../controller/blizzard"

class Routes {

  private BlizzardController: BlizzardController

  constructor() {
    this.BlizzardController = new BlizzardController()
  }

  public routes(app: express.Application): void {
    app.route('/')
      .get((request: Request, response: Response) => {
        response.status(200).send({ message: "Bienvenue sur l'API des décrépits acharnés" })
      })

    app.route('/blizzard/guild/roster')
      .get(this.BlizzardController.getGuildRoster)
    app.route('/blizzard/guild/achievements')
      .get(this.BlizzardController.getGuildAchievements)
    app.route('/blizzard/guild/activity')
      .get(this.BlizzardController.getGuildActivity)

    app.route('/blizzard/character/:username/profile')
      .get(this.BlizzardController.getCharacterProfile)
    app.route('/blizzard/character/:username/pvp')
      .get(this.BlizzardController.getCharacterPvp)
    app.route('/blizzard/character/:username/encounters')
      .get(this.BlizzardController.getCharacterEncounters)
  }
}

export { Routes }

