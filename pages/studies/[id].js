import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
import { theme } from '../_app';
import StudySummary from '../../components/StudySummary';
import MeasuresSideDeck from '../../components/MeasuresSideDeck';
import InsightsDeck from '../../components/InsightsDeck';
import BaselinesDeck from '../../components/BaselinesDeck';
import SectionHeader from '../../components/SectionHeader';
import EffectsOverview from '../../components/EffectsOverview';
import MeasureOverview from '../../components/MeasureOverview';
import ResultsPage from '../../components/ResultsPage';
import EffectsPage from '../../components/EffectsPage';
import RelatedStudiesPage from '../../components/RelatedStudiesPage';
import PageBody from '../../components/PageBody';
import StudySection from '../../components/StudySection';
import Header from '../../components/Header';


const groupColorWheel = [
'#ffbc80', 
'#8185FF', 
'#80c3ff', 
'#bc80ff', 
'#fb80ff'];

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

export async function getStaticPaths() {
  // const jsonDirectory = path.join(process.cwd(), 'data');

  // const staticRoutes = JSON.parse(await fs.readFile(jsonDirectory + '/static_routes.json', 'utf8'));
  const staticRoutes = {study_routes: [
    {id: 'NCT01332318'},
    {id: 'NCT01014533'},
    {id: 'NCT00392041'},
    {id: 'NCT00386334'},
  ]}

  return {
    paths: staticRoutes.study_routes.map(x => ({params: x})),
    fallback: 'blocking' 
  }
}

export async function getStaticProps(context) {
  const { id, ...rest } = context.params;

  const studyRes = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/studies/${id}`);
  const studyData = await studyRes.json();

  const groupsRes = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/studies/${id}/groups`);
  const groupData = await groupsRes.json();

  const effectsRes = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/studies/${id}/effects`);
  const effectsData = await effectsRes.json();

  const baselinesRes = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/studies/${id}/baselines`);
  const baselinesData = await baselinesRes.json();

  // const measuresRes = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/studies/${id}/measures`);
  // const measuresData = await measuresRes.json();

  return { props: { 
    study: studyData?.studies[0],
    groups: groupData?.groups?.map((x, index) => ({...x, color: groupColorWheel[index % groupColorWheel.length]})),
    effects: effectsData?.effects.map((effectGroup, i) => ({
      name: effectGroup.title,
      effects: effectGroup.effects,
      fill: groupColorWheel[i % groupColorWheel.length] 
    })),
    baselines: baselinesData?.baselines,
  }};
}

export default function Study(props) {
  return (
    <>
      <Head>
        <title>{`${props.study.short_title}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={props.study.description} />
        <meta name="og:title" content={props.study.short_title} />
        <meta name="og:description" content={props.study.description} />
      </Head>
      <Main {...props} />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
  );
}

function Main(props) {
  const router = useRouter();
  const { id, section } = router.query;

  const [selectedMeasure, setSelectedMeasure] = useState(undefined);

  const [measures, setMeasures] = useState([]);
  const [measuresIsLoading, setMeasuresIsLoading] = useState(true);

  useEffect(() => {
    // Load the measures on the client
    if (id && router.isReady) {
      console.log(router);
      setMeasuresIsLoading(true);
      fetchMeasures();
    }
  }, [router.isReady])

  async function fetchMeasures() {
    const measuresRes = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/studies/${id}/measures`);
    const measuresData = await measuresRes.json();

    setMeasures(measuresData?.measures);

    if (measuresData) { setMeasuresIsLoading(false); }
  }

  function handleChange(index) {
    const cat = index2cat[index];
    router.query.section = cat

    router.push(router, undefined, { shallow: true });
  }

  return (
    <>
    <Header />

    <PageBody mt={0} align='center' justifyContent='center' bg='#CED4DB'>
    <Flex minH='90vh' 
      flexDirection={['column', 'row']}
      w='100%'
      borderRadius={4}
      m={['0%', '2.5%']}
      pb={5}
      bg='white'
      alignItems='stretch'>
      <VStack mb={[3, 0]} w={['100%', '30%']} pl={[3,5]} pr={[3,5]} pt={5} borderRadius={4}>
        <StudySummary rowGap={[1, 0]} headingSx={{fontSize: '18px'}} {...props.study}/>
        <Flex flexDirection='column' display={section !== 'results' ? 'flex' : 'none'}>

          <Hide below='md'>
          <Text textAlign='left' fontSize='13px' fontWeight='500'>{props.study?.description}</Text>
          <Link float='left' color='purple.300' href={`https://clinicaltrials.gov/ct2/show/${id}`}>{'see source'}</Link>
          <Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>
          </Hide>

        </Flex>
      </VStack>

      <Tabs w={['100%', '70%']} isLazy
        variant={['unstyled', 'enclosed']}
        index={cat2index[section || 'overview']} onChange={handleChange}>
        <TabList borderTop={['1px solid rgb(226, 232, 240)', 'none']} 
          bg={['none','#CED4DB']}
          overflowY='none'
          overflowX={['auto', 'visible']}>
          {['Overview', 'Participants', 'Results', 'Adverse Effects', 'Related Studies'].map(x => (
            <Tab key={x +'-tab'}
              border={['1px solid rgb(226, 232, 240)', 'none']}
              borderBottom='1px solid rgb(226, 232, 240)' 
              borderColor={[section === x.toLowerCase() ? 'purple.300' : 'rgb(226, 232, 240)', 'none']}
              ml={[0,1]} 
              bg='white'>{x}</Tab>
          ))}
        </TabList>

        <TabPanels bg={['#CED4DB44', 'white']} w={['100%']} borderLeft={['none','1px solid #cccccc']}>
        <TabPanel w='100%'>
          <VStack mt={5} spacing={8} w='100%' pl={[2,5]} pr={[2,5]} alignItems='stretch'>
            <StudySection header='Highlights'>
              <InsightsDeck study_id={id} type={'STUDY'} />
            </StudySection>
            <Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>

            <Box w='100%'>
              <BaselinesDeck {...{studyId: id, baselines: props.baselines}}/>
            </Box>
            <Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>

            <Box>
              <EffectsOverview
                studyId={id}
                effectsGroups={props.effects}/>
            </Box>
            <Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>

            <Box>
              <MeasureOverview 
                no_measures={measures?.length}
                isLoading={measuresIsLoading}
                studyId={id}
                groups={props.groups}
                measure={measures?.[0]}/>
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
          <ResultsPage 
            study={props.study}
            measures={measures}
            isLoading={measuresIsLoading}
            selectedMeasure={selectedMeasure}
            setSelectedMeasure={setSelectedMeasure}
            groups={props.groups}/>
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
    </>
  ) 
}