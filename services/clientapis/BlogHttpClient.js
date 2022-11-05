import AppConfig from '../AppConfig';
import { cache } from './HttpClientCache';

const axios = require('axios');

class BlogHttpClient {
	constructor(cache, baseUrl) {
		this.cache = cache;
		this.instance = axios.create({
			baseURL: baseUrl
		});
		this.base = baseUrl;
	}

	checkCache(url) {
		return this.cache[url];
	}

	async getBlog(site, user, article) {
		if (!this.checkCache(article)) await this.getFeed(site, user);
		return this.checkCache(article);
	}

	cacheResponse(url, response) {
		this.cache[url] = response;
	}
	
	async getFeed(site, user) {
		const response = await axios.get(AppConfig.api_url+'/blogs/'+site+'/'+user);
		if (response.status !== 200) {
			throw new Error("Failed to collect study, status: " + response.status);
		}

		const data = await response.data;
		if (data.entries) data.entries.map(x => {
			const slices = x.link.split('/');
			this.cacheResponse(slices[slices.length-1].split('?')[0], x);
		});
		return data;
	}
}

export default new BlogHttpClient(cache, AppConfig.api_url);
