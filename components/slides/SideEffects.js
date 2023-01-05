import { useState } from 'react';
import {
  Flex,
  Heading
} from '@chakra-ui/react';
import ComparisonSelectors from '../ComparisonSelectors';
import EffectsDataWrapper from '../EffectsDataWrapper';


export default function SideEffects() {
  const [treatments, setSelectedTreatments] = useState([]);

  return (
    <Flex flexDirection='column' rowGap={5} w='100%' alignItems='center'>
      <Heading>{'Quantifying side effects'}</Heading>
      <ComparisonSelectors
        conditionName={'Insomnia'}
        selectedTreatments={treatments}
        setSelectedTreatments={setSelectedTreatments}/>
      <EffectsDataWrapper treatments={treatments}/>
    </Flex>
  )
}