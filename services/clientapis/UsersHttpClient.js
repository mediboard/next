import AppConfig from '../AppConfig';
import { cache } from './HttpClientCache';

const axios = require('axios');

class UsersHttpClient {
  constructor(cache, baseUrl) {
    this.cache = cache;
    this.instance = axios.create({
      baseURL: baseUrl 
    });
    this.base = baseUrl;
  }

  async checkout() {
    let config = {
      url: this.base + '/users/checkout',
    }
    let uri = this.instance.getUri(config);

    const response = await axios.get(uri);
    if (response.status !== 200) {
      throw new Error("Failed to create checkout: " + response.status);
    }

    const data = await response.data;

    return data;
  } 

  async getSession(sessionId) {
    let config = {
      url: this.base + '/users/session/'+sessionId,
    }
    let uri = this.instance.getUri(config);

    const response = await axios.get(uri);
    if (response.status !== 200) {
      throw new Error("Failed to fetch checkout: " + response.status);
    }

    const data = await response.data;

    return data;
  }

  async getToken(username, stripe_id) {
    let config = {
      url: this.base + `/users/${username}/stripeid/${stripe_id}/token`,
    }
    let uri = this.instance.getUri(config);

    const response = await axios.get(uri);
    if (response.status !== 200) {
      throw new Error("Failed to fetch token: " + response.status);
    }

    const data = await response.data;

    return data;
  }
}

export default new UsersHttpClient(cache, AppConfig.api_url);
