import Axios, { AxiosInstance } from 'axios';


class BattleNetWrapper {

  private clientId:string = '857d2ae231584258a032a0beecccc401';
  private clientSecret:string = 'nF1olK75acTT9vgjEPgjG4ZshB2uzrBD';
  private oauthToken: string;
  private axios: AxiosInstance;

  constructor() {}

  get realmSlug () {
    return 'conseil-des-ombres';
  }

  get guildSlug () {
    return 'les-décrépits-acharnés';
  }

  async init() {
    try {
      this.axios = Axios.create({
          baseURL: 'https://eu.api.blizzard.com',
          params: {
            locale: 'fr_FR',
            namespace: 'profile-eu',
          }
      });

      await this.setOAuthToken();
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.oauthToken}`;
    } catch (error) {
      console.log(error);
    }
  }

  async apiCall(apiUrl: string, errorMessage: string): Promise<object> {
    await this.init();
    try {
      const response = await this.axios.get(encodeURI(apiUrl));
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Blizzard API Call Error :: ${errorMessage}`);
    }
  }

  async setOAuthToken() {
    try {
      const response = await Axios.get(`https://eu.battle.net/oauth/token`, {
        auth: {
          username: this.clientId,
          password: this.clientSecret,
        },
        params: {
          grant_type: 'client_credentials',
        },
      });

      this.oauthToken = response.data.access_token;
    } catch (error) {
      console.log(error);
      throw new Error(`Problem getting the OAuth token from the Blizzard API.
                      Please check that your Client ID and Secret are correct.`);
    }
  }
}
export default BattleNetWrapper;
