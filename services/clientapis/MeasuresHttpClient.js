import AppConfig from '../AppConfig';
import { cache } from './HttpClientCache';

const axios = require('axios');

class MeasuresHttpClient {
  constructor(cache, baseUrl) {
    this.cache = cache;
    this.instance = axios.create({
      baseURL: baseUrl 
    });
    this.base = baseUrl;
  }

  async search(query) {
    let config = {
      url: this.base + '/measures/search',
      params: { q: query }
    }
    let uri = this.instance.getUri(config);

    const response = await axios.get(uri);
    if (response.status !== 200) {
      throw new Error("Failed to search measures: " + response.status);
    }

    const data = await response.data;

    return data;
  }

}

export default new MeasuresHttpClient(cache, AppConfig.api_url);
