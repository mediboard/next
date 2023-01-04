import { useState } from 'react';
import {
  Switch,
  FormControl,
  FormLabel,
  Flex
} from '@chakra-ui/react';
import EffectsDataWrapper from '../EffectsDataWrapper';


const treatments = [
  {
    name: 'Pregabalin',
    id: 86,
    fill: '#bc80ff'
  }
];

export default function GenderSideEffects() {
  const [isFemaleOnly, setIsFemaleOnly] = useState(false);

  return (
    <Flex flexDirection='column' w='100%'>
      <FormControl display='flex' alignItems='center'>
        <FormLabel>{'Is female only'}</FormLabel>
        <Switch
          isChecked={isFemaleOnly} 
          onChange={() => setIsFemaleOnly(!isFemaleOnly)}/>
      </FormControl>

      <EffectsDataWrapper
        treatments={treatments}
        filters={isFemaleOnly ? {gender: 'FEMALE'} : undefined} />
    </Flex>
  );
}