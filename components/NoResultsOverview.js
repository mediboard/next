import {
  Flex,
  Divider,
  Text,
  VStack
} from '@chakra-ui/react';
import StudySection from './StudySection';
import MeasuresTile from './MeasuresTile';
import StudyKeyItems from './StudyKeyItems';


export default function NoResultsOverview(props) {
  const { measures, study, ...kv } = props;

  return (
    <VStack w='100%' mt={5} alignItems='stretch' spacing={8} pl={[2,5]} pr={[2,5]} >
      <StudySection header='Attributes' w='100%'>
        <StudyKeyItems study={study} w='100%' />
      </StudySection>
      <Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>
      <StudySection header='Measures'>
        <VStack>
        {measures.map(measure => (
          <MeasuresTile measure={measure}/>
        ))}
        </VStack>
      </StudySection>
    </VStack>
  )
}