class AppConfig {
	conditionsRoute = '';
	treatmentsRoute = '';
	constructor({
		treatmentsRoute,
		conditionsRoute}) {
    this.API_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
    this.conditionsRoute = conditionsRoute;
    this.treatmentsRoute = treatmentsRoute;
    this.nullTreatment = 10;
	}

	get api_url() {
		return this.API_URL;
	}
}

export default new AppConfig({
	treatmentsRoute: '/medical/treatments',
	conditionsRoute: '/medical/conditions'});
