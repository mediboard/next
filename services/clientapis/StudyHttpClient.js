import AppConfig from '../AppConfig';
import { cache } from './HttpClientCache';

const axios = require('axios');

class StudyHttpClient {
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

	cacheResponse(url, response) {
		this.cache[url] = response;
	}
	
	async getStudy(study_id) {
		const response = await axios.get(AppConfig.api_url+'/studies/'+study_id);
		if (response.status !== 200) {
			throw new Error("Failed to collect study, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async getStudyAttributes(attribute, args, limit) {
		let config = {
			url: `${this.base}/studies/data/${attribute}`,
			params: { limit: limit, ...args }
		}

		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect related studies, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async getRelatedStudies(study_id, page) {
		let config = {
			url: this.base + '/studies/'+study_id+'/related',
			params: { page: page }
		}

		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect related studies, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async searchValues(value, query) {
		let config = {
			url: `${this.base}/studies/${value}/values`,
			params: { q: query, limit: 10 }
		}

		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect study values, status: " + response.status);
		}

		const data = await response.data;
		return data;

	}

	async listValues(value) {
		let config = {
			url: `${this.base}/studies/${value}/values`,
			params: { limit: 10 }
		}

		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect study values, status: " + response.status);
		}

		const data = await response.data;
		return data;

	}

	async getCriteria(study_id) {
		const response = await axios.get(AppConfig.api_url+'/studies/'+study_id+'/criteria');
		if (response.status !== 200) {
			throw new Error("Failed to collect criteria, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async getConditions(study_id) {
		const response = await axios.get(AppConfig.api_url+'/studies/'+study_id+'/conditions');
		if (response.status !== 200) {
			throw new Error("Failed to collect conditions, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async getTreatments(study_id) {
		const response = await axios.get(AppConfig.api_url+'/studies/'+study_id+'/treatments');
		if (response.status !== 200) {
			throw new Error("Failed to collect treatments, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async getMeasures(study_id, limit=undefined, primary=false) {
		let params = {};
		if (limit) { params['limit'] = limit };
		if (primary) { params['primary'] = primary };

		let config = {
			url: this.base + '/studies/'+study_id+'/measures',
			params: params
		}

		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect measures, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async getGroups(study_id) {
		const response = await axios.get(AppConfig.api_url+'/studies/'+study_id+'/groups');
		if (response.status !== 200) {
			throw new Error("Failed to collect groups, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async deleteAdmin(admin_id) {
		const response = await axios.delete(AppConfig.api_url+'/studies/administrations/'+admin_id);
		if (response.status !== 200) {
			throw new Error("Failed to delete admin, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async addAdmin(admin) {
		const response = await axios.post(AppConfig.api_url+'/studies/administrations', admin);
		if (response.status !== 200) {
			throw new Error("Failed to create administration, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async updateGroup(groupId, group) {
		const response = await axios.put(AppConfig.api_url+'/studies/groups/'+groupId, group);
		if (response.status !== 200) {
			throw new Error("Failed to update group, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async addInsight(study_id, insight) {
		const response = await axios.post(AppConfig.api_url+'/studies/'+study_id+'/insights', insight);
		if (response.status !== 200) {
			throw new Error("Failed to create insight, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async getInsights(study_id, type=undefined, measure_id=undefined) {
		let params = {};
		if (type) { params['type'] = type };
		if (measure_id) { params['measure_id'] = measure_id };

		let config = {
			url: this.base + '/studies/'+study_id+'/insights',
			params: params
		}

		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to get insights, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async getEffects(study_id) {
		const response = await axios.get(AppConfig.api_url+'/studies/'+study_id+'/effects');
		if (response.status !== 200) {
			throw new Error("Failed to collect effects, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async getBaselines(study_id) {
		const response = await axios.get(AppConfig.api_url+'/studies/'+study_id+'/baselines');
		if (response.status !== 200) {
			throw new Error("Failed to collect baselines, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async getBannerStudies() {
		const response = await axios.get(AppConfig.api_url+'/studies/banner');
		if (response.status !== 200) {
			throw new Error("Failed to collect banner studies, status: " + response.status);
		}

		const data = await response.data;
		return data;
	}

	async search(page, params) {
		let config = {
			url: this.base + '/studies/',
			params: { page: page, ...params }
		}

		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to search studies: " + response.status);
		}

		return await response.data;
	}

	async getStudiesWithIds(ids) {
		let config = {
			url: this.base + '/studies/get_studies_by_ids',
			params: { ids: ids.join(',') }
		}

		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to search studies: " + response.status);
		}

		const data = await response.data;
		const finalData = data['studies'];

		return finalData;
	}
}

export default new StudyHttpClient(cache, AppConfig.api_url);
