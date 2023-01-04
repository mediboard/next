import {
  Flex
} from '@chakra-ui/react';
import FixedMeasuresDeck from '../FixedMeasuresDeck';


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
    <Flex>
      <FixedMeasuresDeck 
        conditionId={conditionInfo.id}
        treatments={treatments}/>
    </Flex>
  );
}