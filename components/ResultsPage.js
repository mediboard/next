import { useState } from 'react';
import {
	VStack,
	Box,
	Text,
	Divider
} from '@chakra-ui/react';
import Measure from './Measure';
import StudySection from './StudySection'
import MeasuresSelector from './MeasuresSelector';
import InsightsDeck from './InsightsDeck';


export default function ResultsPage(props) {
	const {
		selectedMeasure,
	  setSelectedMeasure,
	  measures,
	  groups,
	  study,
	  ...kv } = props;

	return (
		<VStack w='100%' spacing={8} align='stretch'>
			<StudySection header={'Highlights'}>
				<InsightsDeck study_id={study?.id} type={'MEASURE'} />
			</StudySection>
			
      <Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>

			<MeasuresSelector
				bg='white'
				setSelectedMeasure={setSelectedMeasure}
				selectedMeasure={selectedMeasure}
				measures={measures} />
			<Measure 
				measureData={selectedMeasure} 
				hideTitle
				groupData={groups?.filter(group => selectedMeasure?.outcomes?.map(out => out.group)?.includes(group.id))} />
		</VStack>
	);
}