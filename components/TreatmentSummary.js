import { useEffect, useState } from 'react';
import {
	Flex,
	Box,
	Spacer,
	Heading,
	Text
} from '@chakra-ui/react';
import AttributeSummaryCard from './AttributeSummaryCard';
import { ItemBadge } from './TreatmentCompareItem';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';


export default function TreatmentSummary(props) {
	const { treatment, conditionGroup, ...kv } = props;

	const [effects, setEffects] = useState([]);
	const [effectsIsLoading, setEffectsIsLoading] = useState(true);

	const [noAnalytics, setNoAnalytics] = useState(0);
	const [noAnalyticsIsLoading, setNoAnalyticsIsLoading] = useState(true);

	useEffect(() => {
		if (treatment?.id) {
			fetchEffects();
			// fetchNoAnalytics();
		}
	}, [treatment?.id])

	async function fetchEffects() {
		setEffectsIsLoading(true);
		treatmentHttpClient.getEffects(treatment?.name).then(data => {
			setEffects(data);
		}).catch(error => {
			console.log(error);
		}).finally(() => {
			setEffectsIsLoading(false);
		})
	}

	// async function fetchNoAnalytics() {
	// 	setNoAnalyticsIsLoading(true);
	// 	treatmentHttpClient.getNoAnalytics(treatment?.name, {condition_group: conditionGroup}).then(data => {
	// 		setNoAnalytics(data['no_analytics']);
	// 	}).catch(error => {
	// 		console.log(error);
	// 	}).finally(() => {
	// 		setNoAnalyticsIsLoading(false);
	// 	})
	// }

	return (
		<Flex w='100%' rowGap={4} flexDirection='column' alignItems='center' {...kv}>
			<Heading fontSize='md'>{treatment?.name}</Heading>
			<Flex columnGap={2} w='100%' alignItems='center'>
			<ItemBadge
				color='purpleHover.300'
				w='fit-content'
				textAlign='center'>
				{`${treatment?.no_studies} Studies`}
			</ItemBadge>
			<ItemBadge
				color='orange.200'
				w='fit-content'
				textAlign='center'>
				{`${effects?.filter(x => x.effected > 1)?.length} Side Effects`}
			</ItemBadge>
			</Flex>
			<ItemBadge
				color='blue.200'
				w='fit-content'
				textAlign='center'>
				{`${noAnalytics} Analytics`}
			</ItemBadge>

		</Flex>
	);
}