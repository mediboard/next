import AppConfig from '../AppConfig';
import { cache } from './HttpClientCache';

const axios = require('axios');


class TreatmentHttpClient {
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

	async getTreatment(drug) {
		let config = {
			url: this.base + '/treatments/' + drug,
		}
		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to search treatments: " + response.status);
		}

		const data = await response.data;
		const finalData = data['treatment'];

		return finalData;
	}

	async search(query, limit) {
		let config = {
			url: this.base + '/treatments/search',
			params: { q: query, limit: limit }
		}
		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to search treatments: " + response.status);
		}

		const data = await response.data;
		const finalData = data['results'];

		return finalData;
	}

	async getEffects(drug, limit=0) {
		let config = {
			url: this.base + '/treatments/'+drug+'/effects',
			params: { limit: limit }
		};
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect effects, status: " + response.status);
		}

		const data = await response.data;
		const finalData = data['effects'];
		this.cacheResponse(uri, finalData);

		return finalData;
	}

	async getDemographics(drug) {
		let config = { url: this.base + '/treatments/'+drug+'/demographics' };
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect demographics, status: " + response.status);
		}

		const data = await response.data;
		const finalData = data['baselines'];
		this.cacheResponse(uri, finalData);

		return finalData;
	}

	async getEfficacy(drug) {
		let config = { url: this.base + '/treatments/'+drug+'/spread' };
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}
		
		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect efficacy data, status: " + response.status);
		}

		const data = await response.data;
		const finalData = data;
		this.cacheResponse(uri, finalData);

		return data;
	}

	async getConditions(drug) {
		let config = { url: this.base + '/treatments/'+drug+'/conditions' };
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}
		
		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect conditions data, status: " + response.status);
		}

		const data = await response.data;
		const finalData = data['conditions'];
		this.cacheResponse(uri, finalData);

		return data['conditions'];
	}

	async getAnalytics(drug, params) {
		let config = {
			params: params,
			url: this.base + '/treatments/'+drug+'/analytics'
		};
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}
		
		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect conditions data, status: " + response.status);
		}

		const data = await response.data;
		const finalData = data['analytics'];
		this.cacheResponse(uri, finalData);

		return finalData;
	}

	async getConditionAnalytics(drug) {
		let config = { url: this.base + '/treatments/'+drug+'/conditionanalytics' }
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}
		
		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect conditions data, status: " + response.status);
		}

		const data = await response.data;
		const finalData = data['conditions'];
		this.cacheResponse(uri, finalData);

		return data['conditions'];
	}

	async getStudyAnalytics(drug, params) {
		let config = { 
			url: this.base + '/treatments/'+drug+'/studyanalytics',
			params: params 
		}
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}
		
		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect study data, status: " + response.status);
		}

		const data = await response.data;
		const finalData = data['studies'];
		this.cacheResponse(uri, finalData);

		return finalData;
	}

	async getNoStudies(drug) {
		let config = { 
			url: this.base + '/treatments/'+drug+'/nostudies'
		}
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}
		
		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect number of studies data, status: " + response.status);
		}

		const data = await response.data;
		const finalData = data['no_studies'];
		this.cacheResponse(uri, finalData);

		return finalData;
	}

	async getNoConditions(drug) {
		let config = { 
			url: this.base + '/treatments/'+drug+'/noconditions'
		}
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}
		
		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect number of conditions data, status: " + response.status);
		}

		const data = await response.data;
		const finalData = data['no_conditions'];
		this.cacheResponse(uri, finalData);

		return finalData;
	}

	async getTopTreatments() {
		let config = { 
			url: this.base + '/treatments/top'
		}
		let uri = this.instance.getUri(config);

		if (this.checkCache(uri)) {
			return this.checkCache(uri);
		}
		
		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect top treatments, status: " + response.status);
		}

		const data = await response.data;
		const finalData = data['treatments'];
		this.cacheResponse(uri, finalData);

		return finalData;
	}

	async getPlaceboMeasures(treatmentId, conditionId, page) {
		let config = {
			url: this.base + '/treatments/'+treatmentId+'/condition/'+conditionId+'/get_placebo_measures',
			params: { page: page }
		}
		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect placebo measures, status: " + response.status);
		}

		const data = await response.data;

		return data;
	}

	async getPlaceboMeasureGroups(treatmentId, conditionId) {
		let config = {
			url: this.base + '/treatments/'+treatmentId+'/condition/'+conditionId+'/get_placebo_measure_groups',
		}
		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect placebo measures, status: " + response.status);
		}

		const data = await response.data;

		return data;
	}

	async getPlaceboAnalytics(treatmentId, measureId) {
		let config = {
			url: this.base + '/treatments/'+treatmentId+'/measure/'+measureId+'/get_placebo_analytics'
		}
		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect placebo analytics, status: " + response.status);
		}

		const data = await response.data;

		return data;
	}

	async getAnalyticOutcomes(analyticId) {
		let config = {
			url: this.base + '/treatments/analytics/'+analyticId+'/outcomes'
		}
		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect analytic outcomes, status: " + response.status);
		}

		const data = await response.data;

		return data;
	}

	async getDValues(treatmentId, conditionId, measureGroupId) {
		let config = {
			url: this.base + `/treatments/${treatmentId}/condition/${conditionId}/measuregroup/${measureGroupId}/dvalues`
		}
		let uri = this.instance.getUri(config);

		const response = await axios.get(uri);
		if (response.status !== 200) {
			throw new Error("Failed to collect the d values, status: " + response.status);
		}

		const data = await response.data;

		return data;
	}
}

export default new TreatmentHttpClient(cache, AppConfig.api_url);
