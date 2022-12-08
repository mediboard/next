import { useState, useEffect } from 'react';
import { 
	Flex,
	Box,
	VStack, 
	Text, 
	Textarea,
	IconButton } from '@chakra-ui/react';
import { StarIcon, CheckIcon } from '@chakra-ui/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { isAdminUser } from '../utils';
import studyHttpClient from '../services/clientapis/StudyHttpClient';


export default function InsightsDeck(props) {
	const { study_id, type, measure_id, ...kv } = props;

  const { user } = useAuthenticator((context) => [context.user]);

	const [insights, setInsights] = useState([]);
	const [insightsAreLoading, setInsightsAreLoading] = useState(true);
	const [body, setBody] = useState(undefined);

	useEffect(() => {
		if (study_id) {
			getInsights();
		}
	}, [study_id, type, measure_id])

	function addInsight() {
		const insightToAdd = {
			body: body,
			study: study_id,
		}

		if (type) { insightToAdd['type'] = type; }
		if (measure_id) { insightToAdd['measure'] = measure_id; }

		studyHttpClient.addInsight(study_id, insightToAdd).then(data => {
			setInsights([...insights, data?.insight]);
		}).catch(error => {
			console.log(error);
		});
	}

	function getInsights() {
		setInsightsAreLoading(true);
		studyHttpClient.getInsights(study_id, type, measure_id).then(data => {
			setInsights(data?.insights);
		}).catch(error => {
			console.log(error);
		}).finally(() => {
			setInsightsAreLoading(false);
		});
	}

	function handleChange(e) {
		let inputValue = e.target.value;
		setBody(inputValue);
	}

	function onSubmit() {
		addInsight()
	}

	return (
		<>
		<VStack w='100%' alignItems='start'>
		{insights?.map(x => (
			<Flex key={x.id} alignItems='center' gap={2}>
				<StarIcon color='purple.300' />
				<Text fontWeight='500'>{x.body}</Text>
			</Flex>
		))}
		{ isAdminUser(user?.username) &&
			<>
			<Textarea value={body} onChange={handleChange} />
			<IconButton icon={<CheckIcon />} onClick={onSubmit} />
			</>}
		</VStack>
		{!insights.length && <Flex w='100%' justifyContent='center'>
			<Box pt={1} pb={1} pl={3} pr={3} borderRadius={5} bg='#CED4DB'>
				<Text fontWeight='500'>{'Key insights not available for this study'}</Text>
			</Box>
		</Flex>
		}
		</>
	);
}