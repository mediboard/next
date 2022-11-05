import { powerScoreColorScale } from './ColorScaleService';


// 0-10 worst to best
export function ScaleAnalytics(analyticsData) {
	return analyticsData.filter(x => x.p_value != null && x.p_value<=1)
		.map(x => x.p_value)
		.map(x => 1 - x)
		.map(x => x * 10);
}

export function BucketScaledAnalytics(scaledAnalytics) {
	let pValBuckets = Array.from({length: 10}, (_, i) => i + 1).map(
		(x, index) => ({'values': [], 'count':0, 'value': index+1}));

	scaledAnalytics.forEach(x => {
		pValBuckets[Math.max(Math.ceil(x), 1) - 1]['values'].push(x);
		pValBuckets[Math.max(Math.ceil(x), 1) - 1]['count']++;
		pValBuckets[Math.max(Math.ceil(x), 1) - 1]['fill'] = powerScoreColorScale(Math.max(Math.ceil(x), 1));
	});

	return pValBuckets;
}