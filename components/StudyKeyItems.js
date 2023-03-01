import {
  Flex,
  Text,
  HStack
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

const caseText = (text) => (
  text.replace(/_/g,' ').toLowerCase().replace(/\b\w/g, (match) => (match.toUpperCase()))
)

export default function StudyKeyItems(props) {
  const { study, ...kv } = props;

  return (
    <Flex flexWrap='wrap' gap={4} justifyContent='center' {...kv}>
    {Object.keys(studyKeyFields).map(x => (
      <HStack alignItems='center' key={x+'-deck'}>
        <Text mr={1}>{`${caseText(x)}:`}</Text>
        <ExpandableDeck
          w='fit-content'
          columnGap={2}
          rowGap={1}
          no_shown={2}
          mt={2} mb={2}>
        {(Array.isArray(study?.[x]) ? study?.[x] : [study?.[x]]).map(
          y => caseText(y.toString())
        ).map(y => (
          <ItemBadge 
            key={y+'-item'}
            w='fit-content'
            textAlign='center'
            color={studyKeyFields[x]}>
            {y}
          </ItemBadge>
        ))}
        </ExpandableDeck>
      </HStack>
    ))}
    </Flex>
  )
}