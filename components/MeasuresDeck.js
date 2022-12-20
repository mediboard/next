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

	useEffect(() => {
		if (router.query.groups) {
			setMeasureGroups(router.query.groups?.split(','))
		}
	}, [router.query.groups])

	function updateMeasureGroups(values) {
		router.query.groups = values?.join(',');
		router.push(router, undefined, { shallow: true });
	}

	return (
		<VStack w='100%'>
			<MeasureGroupsCreator setGroup={(value) => {updateMeasureGroups([value, ...measureGroups])}} w='100%' alignItems='center'/>

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