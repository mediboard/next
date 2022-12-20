import { useState, useEffect } from 'react';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import EffectsComparisonStack from './EffectsComparisonStack';


export default function EffectsDataWrapper(props) {
	const { treatments, conditions, ...kv } = props;

	const [effectsGroups, setEffectsGroups] = useState([]);

	useEffect(() => {
		fetchEffects();
	}, [treatments.length])

	async function fetchEffects() {
		console.log("fetching")
		setEffectsGroups(await Promise.all(treatments?.map(async treatment => ({
			name: treatment.name,
			effects: await treatmentHttpClient.getEffects(treatment.name, 20),
			fill: treatment.fill
		}))));
	}

	return (
		<EffectsComparisonStack effectsGroups={effectsGroups} {...kv}/>
	);
}