import { useEffect, useState } from 'react';
import {
	Flex,
	Text,
	HStack,
	VStack,
	Box,
	Heading,
	Hide
} from '@chakra-ui/react';
import PageBody from '../shared/PageBody';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import treatmentHttpClient from '../../services/clientapis/TreatmentHttpClient';
import conditionsHttpClient from '../../services/clientapis/ConditionsHttpClient';
import EffectsComparisonStack from './EffectsComparisonStack';
import { EfficacyComparisonStack } from './EfficacyComparisonStack';
import DemosComparisonStack from './DemosComparisonStack';
import MeasuresComparisonStack from './MeasuresComparisonStack';
import ComparisonSelectors from './ComparisonSelectors';
import ComparisonSideBar from './ComparisonSideBar';
import ExperiencesExplorer from '../medical/shared/ExperiencesExplorer';
import ConditionsPillBox from './ConditionsPillBox';
import TreatmentTitles from './TreatmentTitles';
import SectionHeader from './SectionHeader';
import { toPng } from 'html-to-image'


const COL_GAP=4;

export default function ComparePage() {
	const [condition, setCondition] = useState(undefined);
	const [treatments, setTreatments] = useState([]);

	const [error, setError] = useState('');

	return (
		<PageBody pr={0} pl={0} mt={0}>
      <Box w={'100%'}>
      	<Flex w='100%' flexDirection='column' alignItems='center'>
      		<Flex 
      			mt={3}
      			bg='#cccccc44'
      			w={['100%', '80%']} ml={['0%', '10%']} mr={['0%', '10%']}
      			borderRadius={10}
      			pt={6} rowGap={6}
      			flexDirection='column' 
      			alignItems='center'
      			justifyContent='center'>
      			<Heading fontSize={['22px','32px']}>{'COMPARE TREATMENTS'}</Heading>
	      		<ConditionsPillBox
	      			selectedCondition={condition} 
	      			setSelectedCondition={setCondition}/>
						<ComparisonSelectors
							setSelectedTreatments={setTreatments}
							selectedTreatments={treatments}
							conditionName={condition?.name} />
      		</Flex>

					<VStack gap={2} mt={5} w={['100%', '80%']} align='stretch'>
						<Hide below='md'>
						<TreatmentTitles treatments={treatments}/>
						</Hide>

						<SectionHeader title={'SIDE EFFECTS'}/>
						<EffectsComparisonStack colGap={COL_GAP} treatments={treatments} />
						<SectionHeader title={'DEMOGRAPHICS'}/>
						<DemosComparisonStack colGap={COL_GAP} treatments={treatments}/>
						<SectionHeader title={'STUDIES'}/>
						<EfficacyComparisonStack colGap={COL_GAP} condition={condition} treatments={treatments}/>
						<SectionHeader title={'MEASUREMENTS'}/>
						<MeasuresComparisonStack colGap={COL_GAP} condition={condition} treatments={treatments}/>
						
{/*						<SectionHeader title={'USER EXPERIENCES'}/>
						<ExperiencesExplorer tags={treatments?.map(x => x.name)}/>
*/}					</VStack>
      	</Flex>
			</Box>
		</PageBody>
	);
}