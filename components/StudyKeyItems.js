import {
  Flex,
} from '@chakra-ui/react';
import { ItemBadge } from './TreatmentCompareItem';
import ExpandableDeck from './ExpandableDeck';


export const studyKeyFields = {
  status: '#8185FF',
  phase: '#80c3ff',
  purpose: '#bc80ff',
  has_results: '#fb80ff'
};

export const keyFieldsColorWheel = [
  '#ffbc80', 
  '#8185FF', 
  '#80c3ff', 
  '#bc80ff', 
  '#fb80ff'
];

export default function StudyKeyItems(props) {
  const { study, ...kv } = props;

  return (
    <Flex flexWrap='wrap' {...kv}>
    {Object.keys(studyKeyFields).map(x => (
      <ExpandableDeck
        w='fit-content'
        columnGap={2}
        rowGap={1}
        no_shown={2}
        mt={2} mb={2}>
      {(Array.isArray(study?.[x]) ? study?.[x] : [study?.[x]]).map(y => (
        <ItemBadge 
          key={y+'-item'}
          w='fit-content'
          textAlign='center'
          color={studyKeyFields[x]}>
          {y}
        </ItemBadge>
      ))}
      </ExpandableDeck>
    ))}
    </Flex>
  )
}