import {
	VStack,
	Divider,
	Box,
	Text
} from '@chakra-ui/react';
import EffectsComparisonStack from './EffectsComparisonStack';
import InsightsDeck from './InsightsDeck';
import StudySection from './StudySection';


export default function EffectsPage(props) {
	const { effectsGroups, studyId, ...kv } = props;

	return (
		<VStack w='100%' spacing={8}>
			<StudySection w='100%' header='Highlights'>
				<InsightsDeck study_id={studyId} type={'ADVERSE_EFFECT'} />
			</StudySection>
			
			<Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>

			<StudySection w='100%' header='Frequency of Side Effects'>
				<EffectsComparisonStack effectsGroups={effectsGroups}/>
			</StudySection>
		</VStack>
	);
}