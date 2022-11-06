import { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  ColorModeScript,
  Box,
  Flex,
  Link,
  VStack,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Show,
  Hide,
  HStack,
  Text,
  Heading } from '@chakra-ui/react'
import { theme } from '../../_app';
import StudySummary from '../../../components/StudySummary';
import MeasuresSideDeck from '../../../components/MeasuresSideDeck';
import InsightsDeck from '../../../components/InsightsDeck';
import BaselinesDeck from '../../../components/BaselinesDeck';
import SectionHeader from '../../../components/SectionHeader';
import EffectsOverview from '../../../components/EffectsOverview';
import MeasureOverview from '../../../components/MeasureOverview';
import ResultsPage from '../../../components/ResultsPage';
import EffectsPage from '../../../components/EffectsPage';
import RelatedStudiesPage from '../../../components/RelatedStudiesPage';
import PageBody from '../../../components/PageBody';


const groupColorWheel = [
'var(--chakra-colors-purple-100)', 
'var(--chakra-colors-purple-300)', 
'var(--chakra-colors-purple-500)', 
'var(--chakra-colors-purple-700)', 
'var(--chakra-colors-purple-900)'];

export const cat2index = {
  'overview': 0,
  'participants': 1,
  'results': 2,
  'adverse effects': 3,
  'related studies': 4
}

export const index2cat = [
  'overview',
  'participants',
  'results',
  'adverse effects',
  'related studies'
]

export async function getServerSideProps(context) {
  const { title, id, ...rest } = context.params;

  const studyRes = await fetch(`${process.env.REACT_APP_API_URL}/studies/${id}`);
  const studyData = await studyRes.json();

  const groupsRes = await fetch(`${process.env.REACT_APP_API_URL}/studies/${id}/groups`);
  const groupData = await groupsRes.json();

  const effectsRes = await fetch(`${process.env.REACT_APP_API_URL}/studies/${id}/effects`);
  const effectsData = await effectsRes.json();

  const baselinesRes = await fetch(`${process.env.REACT_APP_API_URL}/studies/${id}/baselines`);
  const baselinesData = await baselinesRes.json();

  const measuresRes = await fetch(`${process.env.REACT_APP_API_URL}/studies/${id}/measures`);
  const measuresData = await measuresRes.json();

  return { props: { 
    study: studyData?.studies[0],
    groups: groupData?.groups?.map((x, index) => ({...x, color: groupColorWheel[index % groupColorWheel.length]})),
    effects: effectsData?.effects,
    baselines: baselinesData?.baselines,
    measures: measuresData?.measures
  }};
}

export default function Study(props) {
  return (
    <>
      <Main {...props} />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
  );
}

function Main(props) {
  const router = useRouter();
  const { title, id, section } = router.query;

  const [selectedMeasure, setSelectedMeasure] = useState(undefined);

  function handleChange(index) {
    const cat = index2cat[index];
    router.query.section = cat

    router.push(router, undefined, { shallow: true });
  }

  return (
    <PageBody mt={0} align='center' justifyContent='center' bg='#CED4DB'>
    <Flex minH='90vh' 
      h='100%'
      flexDirection={['column', 'row']}
      w='100%'
      borderRadius={4}
      m={'2.5%'}
      pb={5}
      bg='white'
      alignItems='start'>
      <VStack w={['100%', '30%']} pl={[3,5]} pr={[3,5]} pt={5} borderRadius={4}>
        <StudySummary headingSx={{fontSize: '18px'}} {...props.study}/>
        <Flex flexDirection='column' display={section !== 'results' ? 'flex' : 'none'}>

          <Hide below='md'>
          <Text textAlign='left'>{'Summary: '}</Text>
          <Text textAlign='left' fontSize='13px' fontWeight='500'>{props.study?.description}</Text>
          <Link float='left' color='purple.300' href={`https://clinicaltrials.gov/ct2/show/${id}`}>{'see source'}</Link>
          <Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>
          </Hide>

        </Flex>

        <Hide below='md'>
        <Box display={section === 'results' ? 'default' : 'none'}>
          <MeasuresSideDeck selectedMeasure={selectedMeasure} setSelectedMeasure={setSelectedMeasure} measures={props.measures}/>
        </Box>
        </Hide>
      </VStack>

      <Tabs w={['100%', '70%']}
        isLazy
        index={cat2index[section || 'overview']}
        onChange={handleChange}>
        <TabList bg={['none','#CED4DB']} overflowX='scroll'>
          <Tab ml={[0,1]} bg='white'>{'Overview'}</Tab>
          <Tab ml={[0,1]} bg='white'>{'Participants'}</Tab>
          <Tab ml={[0,1]} bg='white'>{'Results'}</Tab>
          <Tab ml={[0,1]} bg='white'>{'Adverse Effects'}</Tab>
          <Tab ml={[0,1]} bg='white'>{'Related Studies'}</Tab>
        </TabList>

        <TabPanels w={['100%']} borderLeft={['none','1px solid #cccccc']}>
        <TabPanel w='100%'>
          <VStack w='100%' pl={[2,5]} pr={[2,5]} alignItems='stretch'>
            <Box>
              <SectionHeader pt={1} mb={5} innerSx={{pt: 2, pb: 2, pl:4, pr:4}} title={'Key Insights'} />
              <InsightsDeck study_id={id} type={'STUDY'} />
            </Box>
            <Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>

            <Box>
              <SectionHeader pt={1} mb={2} innerSx={{pt: 2, pb: 2, pl:4, pr:4}} title={'Participants'} />
              <BaselinesDeck {...{studyId: id, title: title, baselines: props.baselines}}/>
            </Box>
            <Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>

            <Box>
              <SectionHeader pt={1} mb={5} innerSx={{pt: 2, pb: 2, pl:4, pr:4}} title={'Results'} />
              <MeasureOverview study={props.study} groups={props.groups} measure={props.measures[0]}/>
              <Link textColor={'purple.300'} 
                float='right'
                href={`/medical/studies/${id}/${title}/results`}>
                {'See more results'}
              </Link>
            </Box>
            <Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>

            <Box>
              <SectionHeader pt={1} mb={5} innerSx={{pt: 2, pb: 2, pl:4, pr:4}} title={'Adverse Effects'} />
              <EffectsOverview
                title={title}
                studyId={id}
                effectsGroups={props.effects}/>
            </Box>
          </VStack>
        </TabPanel>

        <TabPanel>
          <VStack w='100%' pl={[1,5]} pr={[1, 5]} alignItems='stretch'>
            <Box>
              <BaselinesDeck {...{studyId: id, fullPage: true, baselines: props.baselines}}/>
            </Box>
          </VStack>
        </TabPanel>  

        <TabPanel>
          <VStack>
            <ResultsPage study={props.study} selectedMeasure={selectedMeasure} groups={props.groups}/>

            <Hide above='sm'>
            <MeasuresSideDeck selectedMeasure={selectedMeasure} setSelectedMeasure={setSelectedMeasure} measures={props.measures}/>
            </Hide>
          </VStack>
        </TabPanel>  

        <TabPanel>
          <EffectsPage studyId={id} effectsGroups={props.effects} />
        </TabPanel>  

        <TabPanel>
          <RelatedStudiesPage studyId={id} />
        </TabPanel>  
        </TabPanels>
      </Tabs>
    </Flex>
    </PageBody>
  ) 
}