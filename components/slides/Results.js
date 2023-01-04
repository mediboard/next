import {
  Flex,
  Heading
} from '@chakra-ui/react';
import FixedMeasuresDeck from '../FixedMeasuresDeck';
import {EffectLegendItem} from '../EffectsComparisonStack';


const conditionInfo = {
  name: 'Insomnia',
  id: 817
};

const treatments = [
  {
    id: 402,
    name: "Zolpidem",
    fill: '#ffbc80'
  },
  {
    id: 504,
    name: "Eszopiclone",
    fill: '#8185FF'
  }
];


export default function Results() {
  return (
    <Flex flexDirection='column' rowGap={10} alignItems='center' w='100%'>
      <Heading>{'Comparing Insomnia Treatments'}</Heading>
      <Flex columnGap={3}>
      {treatments?.map(treatment => (
        <EffectLegendItem key={treatment?.id} effect={treatment} />
      ))}
      </Flex>
      <FixedMeasuresDeck 
        conditionId={conditionInfo.id}
        treatments={treatments}/>
    </Flex>
  );
}