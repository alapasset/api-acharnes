import Axios, { AxiosInstance } from 'axios';


class BattleNetWrapper {

  private clientId:string;
  private clientSecret:string;
  private oauthToken: string;
  private axios: AxiosInstance;
  private region: string;

  constructor(clientId:string, clientSecret:string, locale:string, region:string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.region = region;
    this.axios = Axios.create({
      baseURL: `https://${this.region}.api.blizzard.com`,
      params: {
        locale: locale,
        namespace: `profile-${region}`,
      }
    });
  }

  async apiCall(apiUrl: string, errorMessage: string): Promise<object> {
    try {
      await this.setOAuthToken();
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.oauthToken}`;
      const response = await this.axios.get(encodeURI(apiUrl));
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Blizzard API Call Error :: ${errorMessage}`);
    }
  }

  async setOAuthToken() {
    try {
      const response = await Axios.get(`https://${this.region}.battle.net/oauth/token`, {
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
      throw new Error(`Problem getting the OAuth token from the Blizzard API. Please check that your Client ID and Secret are correct.`);
    }
  }
}
export default BattleNetWrapper;
