import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
	Flex,
	Text,
	HStack,
	VStack,
	Box,
	Heading,
	Hide,
  ColorModeScript,
} from '@chakra-ui/react';
import PageBody from '../components/PageBody';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import conditionsHttpClient from '../services/clientapis/ConditionsHttpClient';
import EffectsDataWrapper from '../components/EffectsDataWrapper';
import DemosComparisonStack from '../components/DemosComparisonStack';
import MeasuresComparisonStack from '../components/MeasuresComparisonStack';
import ComparisonSelectors from '../components/ComparisonSelectors';
import ConditionMultiSelect from '../components/ConditionMultiSelect';
import { theme } from './_app';


export default function Query() {
	return (
		<>
		<Main />
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
		</>
	)
}

function Main() {
	// Need to get the treatments, conditions, measure_groups
	// The data can be fetched on the request
	// We can bake the treatments and conditions into the url no need for GUI

	const [conditions, setConditions] = useState([]);
	const [treatments, setTreatments] = useState([]);

	const router = useRouter();

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
	      		<ConditionMultiSelect
	      			conditions={conditions}
	      			initialNames={router.query.conditions?.split(',')}
	      			setConditions={setConditions}/>
						<ComparisonSelectors
							setSelectedTreatments={setTreatments}
							selectedTreatments={treatments}
							conditionName={conditions[0]?.name} />
      		</Flex>

					<VStack gap={2} mt={5} w={['100%', '80%']} align='stretch'>
						<EffectsDataWrapper treatments={treatments} />

						<MeasuresComparisonStack condition={conditions[0]} treatments={treatments}/>

						<DemosComparisonStack treatments={treatments}/>
					</VStack>
      	</Flex>
			</Box>
		</PageBody>
	);
}