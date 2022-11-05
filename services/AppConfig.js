class AppConfig {
	conditionsRoute = '';
	treatmentsRoute = '';
	constructor({
		treatmentsRoute,
		conditionsRoute}) {
    this.API_URL = process.env.REACT_APP_API_URL;
    this.conditionsRoute = conditionsRoute;
    this.treatmentsRoute = treatmentsRoute;
    console.log('api: ' + process.env.REACT_APP_API_URL);
	}

	get api_url() {
		return this.API_URL;
	}
}

export default new AppConfig({
	treatmentsRoute: '/medical/treatments',
	conditionsRoute: '/medical/conditions'});
