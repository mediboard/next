import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	VStack,
	Flex,
	Input,
	Button,
	Heading,
	Text,
	Box
} from '@chakra-ui/react';
import MeasureGroupCard from './MeasureGroupCard';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import conditionsHttpClient from '../services/clientapis/ConditionsHttpClient';


export default function MeasuresDeck(props) {
	const { treatments, conditionId, gap, ...kv } = props;

	const router = useRouter();

	const [measureGroupsIsLoading, setMeasureGroupsIsLoading] = useState(true);
	const [measureGroups, setMeasureGroups] = useState([]);

	const [measures, setMeasures] = useState([]);
	const [measuresIsLoading, setMeasuresIsLoading] = useState(false);

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
	// Add a new measuree group by selection

	useEffect(() => {
		if (router.query.groups) {
			setMeasureGroups(router.query.groups?.split(','))
		}
	}, [router.query.groups])

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
		<VStack w='100%'>
			<MeasureGroupsCreator setGroup={(value) => {setMeasureGroups([value, ...measureGroups])}} w='100%' alignItems='center'/>

			{measureGroups.map(group => (
			<MeasureGroupCard 
				group={group}
				treatments={treatments}
				conditionId={conditionId}
				key={'measure-group-card-'+group}/>
			))}
		</VStack>
	)
}

export function MeasureGroupsCreator(props) {
	const { setGroup, ...kv } = props;

	const [value, setValue] = useState('');

	return (
		<Flex {...kv}>
			<Input size='sm' value={value} onChange={(e) => setValue(e.target.value)}/>
			<Button onClick={() => setGroup(value)}>{'Create Group'}</Button>
		</Flex>
	);
}