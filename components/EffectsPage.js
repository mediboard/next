import {
	VStack,
	Divider,
	Box,
	Text
} from '@chakra-ui/react';
import EffectsComparisonStack from './EffectsComparisonStack';
import InsightsDeck from './InsightsDeck';


export default function EffectsPage(props) {
	const { effectsGroups, studyId, ...kv } = props;

	return (
		<VStack w='100%'>
			<Box w='100%'>
				<Text textAlign='left' mb={3}>{'Key Insights:'}</Text>
				<InsightsDeck study_id={studyId} type={'ADVERSE_EFFECT'} />
			</Box>
			<Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>

			<EffectsComparisonStack effectsGroups={effectsGroups}/>
		</VStack>
	);
}