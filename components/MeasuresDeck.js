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
import { ChevronDownIcon } from '@chakra-ui/icons';
import MeasureGroupCard from './MeasureGroupCard';
import CheckableMenu from './CheckableMenu';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import conditionsHttpClient from '../services/clientapis/ConditionsHttpClient';
import measuresHttpClient from '../services/clientapis/MeasuresHttpClient';


export default function MeasuresDeck(props) {
	const { treatments, conditionId, gap, ...kv } = props;

	const router = useRouter();

	const [measureGroupsIsLoading, setMeasureGroupsIsLoading] = useState(true);
	const [measureGroups, setMeasureGroups] = useState([]);

	useEffect(() => {
		if (treatments.length && conditionId) {
			loadMeasureGroups();
		}
	}, [treatments, conditionId])

	async function loadMeasureGroups() {
		setMeasureGroupsIsLoading(true);
		measuresHttpClient.getMeasureGroups(treatments.map(treat => treat.id), conditionId).then(data => {
			setMeasureGroups(data['measure_groups']);

		}).catch(error => {
			console.log(error);

		}).finally(() => {
			setMeasureGroupsIsLoading(false);
		})
	}

	function onGroupOptionToggle(groupId) {
		const currentGroupIds = router.query.groups?.split(',');
		if (currentGroupIds.contains(groupId)) {
			updateMeasureGroups(currentGroupIds?.filter(id => id !== groupId));
			return
		}

		updateMeasureGroups([...currentGroupIds, groupId]);
	}

	function updateMeasureGroups(values) {
		router.query.groups = values?.join(',');
		router.push(router, undefined, { shallow: true });
	}

	return (
		<VStack w='100%'>
			<CheckableMenu
				variant='outlined'
        rightIcon={<ChevronDownIcon />}
				onOptionToggle={onGroupOptionToggle}
				selectedOptions={measureGroups?.filter(
						group => router.query.groups?.split(',').comtains(group.id)
					).map(group => ({id: group.id, label: group.name}))}
				options={measureGroups?.map(group => ({id: group.id, label: group.name}))}>
			{'Select Endpoints'}
			</CheckableMenu>

			{measureGroups.map(group => (
			<MeasureGroupCard 
				group={group}
				treatments={treatments}
				conditionId={conditionId}
				key={'measure-group-card-'+group.id}/>
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