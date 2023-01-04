import { useState } from 'react';
import {
  Switch,
  FormControl,
  FormLabel,
  Heading,
  Flex
} from '@chakra-ui/react';
import EffectsDataWrapper from '../EffectsDataWrapper';
import RadioGroup from '../RadioGroup';


const treatments = [
  {
    name: 'Pregabalin',
    id: 86,
    fill: '#bc80ff'
  }
];

export default function GenderSideEffects() {
  const [genderFilter, setGenderFilter] = useState('ALL');

  return (
    <Flex flexDirection='column' w='100%' rowGap={10} alignItems='center'>
      <Heading>{'Side effects differ by gender'}</Heading>
      <RadioGroup
        name={'gender'}
        onChange={setGenderFilter}
        defaultValue={'ALL'}
        options={['MALE', 'ALL', 'FEMALE']}/>

      <EffectsDataWrapper
        treatments={treatments}
        filters={genderFilter ? {gender: genderFilter} : undefined} />
    </Flex>
  );
}