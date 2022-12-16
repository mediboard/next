import { useState, useEffect } from 'react';
import {
	VStack,
	Flex,
	Heading,
	Text,
	Box
} from '@chakra-ui/react';
import MeasureGroupCard from './MeasureGroupCard';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import conditionsHttpClient from '../services/clientapis/ConditionsHttpClient';


export default function MeasuresDeck(props) {
	const { treatments, conditionId, gap, ...kv } = props;

	const [measureGroupsIsLoading, setMeasureGroupsIsLoading] = useState(true);
	const [measureGroups, setMeasureGroups] = useState([]);

	// useEffect(async () => {
	// 	if (treatments?.length && conditionId) {
	// 		setMeasures(await Promise.all(treatments?.map(async treat => {
	// 			return {
	// 				measures: await fetchMeasures(treat.id, conditionId),
	// 				treatName: treat.name,
	// 				fill: treat.fill
	// 			}
	// 		})));
	// 	}
	// }, [treatments, conditionId])

	useEffect(() => {
		if (conditionId) {
			fetchMesureGroups(conditionId);
		}
	}, [conditionId])

	async function fetchMeasures(treatmentId, conditionId) {
		return (await treatmentHttpClient.getPlaceboMeasureGroups(treatmentId, conditionId))?.measures
	}

	async function fetchMesureGroups(conditionId) {
		setMeasureGroupsIsLoading(true);
		conditionsHttpClient.getMeasureGroups(conditionId).then(data => {
			setMeasureGroups(data?.groups);
		}).catch(error => {
			console.log(error);
		}).finally(() => {
			setMeasureGroupsIsLoading(false);
		})
	}

	return (
		<VStack>
		{measureGroups.map(group => (
			<MeasureGroupCard 
				title={group.name}
				group={group}
				treatments={treatments}
				conditionId={conditionId}
				key={'measure-group-card-'+group.id}/>
		))}
		</VStack>
	)
}