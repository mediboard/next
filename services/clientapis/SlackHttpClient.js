import AppConfig from '../AppConfig';
const axios = require('axios');


export async function sendFeedback(message, email) {
	const params = new URLSearchParams();
	params.append('text', `message: ${message} \nemail: ${email || 'NA'}`);

	const url = AppConfig.api_url + '/feedback/slack'

	return await axios.post(url, params);
}
