import { useState } from 'react';
import {
	VStack,
	Box,
	Text,
	Divider
} from '@chakra-ui/react';
import Measure from './Measure';
import InsightsDeck from './InsightsDeck';


export default function ResultsPage(props) {
	const { selectedMeasure, groups, study, ...kv } = props;

	return (
		<VStack w='100%' gap={5} align='stretch'>
			<Box>
				<Text textAlign='left' mb={3}>{'Key Insights:'}</Text>
				<InsightsDeck study_id={study?.id} type={'MEASURE'} />
			</Box>
			<Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>

			<Box>
				<Measure measureData={selectedMeasure} groupData={groups?.filter(group => selectedMeasure?.outcomes?.map(out => out.group)?.includes(group.id))} />
			</Box>
		</VStack>
	);
}