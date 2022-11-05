import AppConfig from '../AppConfig';
import { cache } from './HttpClientCache';

const axios = require('axios');


class ConditionsHttpClient {
	constructor(cache, baseUrl) {
		this.cache = cache;
		this.instance = axios.create({
			baseUrl: baseUrl
		});
		this.base = baseUrl;
	}

	checkCache(url) {
		return this.cache[url];
	}

	cacheResponse(url, response) {
		this.cache[url] = response;
	}

	async getCondition(name) {
		let config = { url: this.base + '/conditions/' + name };
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get condition: " + response.status);
		}

		const data = await response.data;
		const finalData = data['condition'];
		this.cacheResponse(uri, finalData);

		return finalData
	}

	async getDemographics(name) {
		let config = { url: this.base + '/conditions/' + name +'/demographics' };
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get demographics: " + response.status);
		}

		const data = await response.data;
		const finalData = data['demographics'];
		this.cacheResponse(uri, finalData);

		return finalData
	}

	async getTreatments(name) {
		let config = { url: this.base + '/conditions/' + name +'/treatments' };
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get treatments: " + response.status);
		}

		const data = await response.data;
		const finalData = data['treatments'];
		this.cacheResponse(uri, finalData);

		return finalData
	}

	async getAnalytics(name, treatment_id) {
		let config = { 
			url: this.base + '/conditions/' + name +'/analytics',
			params: { treatment: treatment_id }
		};
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get analytics: " + response.status);
		}

		const data = await response.data;
		const finalData = data['analytics'];
		this.cacheResponse(uri, finalData);

		return finalData
	}

	async search(query, limit)	 {
		let config = {
			url: this.base + '/conditions/search',
			params: { q: query, limit: limit }
		};
		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get conditions: " + response.status);
		}

		const data = await response.data;
		const finalData = data['conditions'];

		return finalData;
	}

	async getTopConditions() {
		let config = {
			url: this.base + '/conditions/top',
		};
		let uri = this.instance.getUri(config);
		console.log(uri);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get conditions: " + response.status);
		}

		const data = await response.data;
		const finalData = data['conditions'];

		return finalData;
	}

	async getStudies(name, treatment_id, page) {
		let config = { 
			url: this.base + '/conditions/' + name +'/studies',
			params: { treatment: treatment_id, page: page }
		};
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get studies: " + response.status);
		}

		const data = await response.data;
		this.cacheResponse(uri, data);

		return data 
	}

	async getNoStudies(name) {
		let config = { 
			url: this.base + '/conditions/' + name +'/no_studies',
		};
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get no studies: " + response.status);
		}

		const data = await response.data;
		this.cacheResponse(uri, data);

		return data 
	}

	async getMeasureGroups(id) {
		let config = { 
			url: this.base + '/conditions/' + id +'/measure_groups',
		};
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get measure groups: " + response.status);
		}

		const data = await response.data;
		this.cacheResponse(uri, data);

		return data 
	}

	async getNoTreatments(name) {
		let config = { 
			url: this.base + '/conditions/' + name +'/no_treatments',
		};
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get no studies: " + response.status);
		}

		const data = await response.data;
		this.cacheResponse(uri, data);

		return data 
	}
}

export default new ConditionsHttpClient(cache, AppConfig.api_url);
