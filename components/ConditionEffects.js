import { useState, useEffect } from 'react';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import EffectsComparisonStack from './EffectsComparisonStack';


export default function ConditionEffects(props) {
	const { treatmentNames, treatColorMap, ...kv } = props;

	const [effectsGroups, setEffectsGroups] = useState([])

	useEffect(() => {
		if (treatmentNames?.length) {
			async function fetchData() {
				setEffectsGroups(await Promise.all(treatmentNames?.map(async treatName => {return {
					effects: await loadEffectsData(treatName),
					name: treatName,
					fill: treatColorMap[treatName] 
				}})));
			}
			fetchData();
		}
	}, [treatmentNames])

	async function loadEffectsData(treatmentName) {
		return await treatmentHttpClient.getEffects(treatmentName, 20)
	}

	return (
		<EffectsComparisonStack effectsGroups={effectsGroups} />
	);
}