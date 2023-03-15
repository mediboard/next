import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Button,
  Spacer,
  Grid,
  Link,
  GridItem,
  ColorModeScript,
  Flex,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import Header from '../../components/Header';
import AttributesCard from '../../components/analytics/AttributesCard';
import CheckableMenu from '../../components/CheckableMenu';
import Banner from '../../components/Banner';
import { theme } from '../_app';
import { buildQueryString } from '../../utils';
import studyHttpClient from '../../services/clientapis/StudyHttpClient';


export default function Analysis() {
  return (
    <>
      <Main />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
  )
}

const ATTRIBUTES = [
  {
    id:'sponsor',
    isVisible: true
  },
  {
    id: 'responsible_party',
    isVisible: true
  },
  {
    id: 'type',
    isVisible: true
  },
  {
    id: 'purpose',
    isVisible: true
  },
  {
    id: 'intervention_type',
    isVisible: true
  },
  {
    id: 'phase',
    isVisible: true
  },
  {
    id: 'completion_date',
    isVisible: true
  },
  {
    id: 'status',
    isVisible: true
  },
  {
    id: 'baselines',
    isVisible: true
  }
]

const groupColorWheel = [
  '#ffbc80', 
  '#8185FF', 
  '#80c3ff', 
  '#bc80ff', 
  '#fb80ff'
];

function Main() {
  const router = useRouter();
  
  const [visibleAttrs, setVisibleAttrs] = useState(ATTRIBUTES);
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      const searchIds = router.query.searches.split(',');
      loadSearches(searchIds);
    }
  }, [router.query])

  async function loadSearches(searchIds) {
    setSearches(await Promise.all(searchIds?.map(async id => (
      (await studyHttpClient.getSearch(id)).search
    ))));
  }

  const SearchButton = (props) => (
    <Button leftIcon={<ChevronLeftIcon />}
      onClick={() => {router.push({
        pathname: '/studies/browse',
        query: router.query
      })}}
      {...props}>
      {'Browse Studies'}
    </Button>
  )

  return (
    <Box h='100vh' display='flex' flexGrow='1' w='100%' flexDirection='column'>
      <Header />
      <Banner>
        <SearchButton />
        <Text ml={3} fontWeight='500' color='gray.600'>
          {`${[...Object.keys(router.query)].filter(x => !['page', 'limit'].includes(x)).length} Filters applied`}
        </Text>
        <Spacer />
        <CheckableMenu
          ml={3}
          variant='outlined'
          options={[...ATTRIBUTES].map(x => ({...x, label: x.id}))}
          onOptionToggle={(colId) => setVisibleAttrs(visibleAttrs.map(
            col => (col.id == colId ? {...col, isVisible: !col.isVisible} : col)
          ))}
          rightIcon={<ChevronDownIcon />}
          selectedOptions={visibleAttrs.filter(col => col.isVisible).map(x => x.id)}>
          {`${visibleAttrs.filter(col => !col.isVisible).length} Columns Hidden`}
        </CheckableMenu>
      </Banner>

      <Grid bg='gray.100' p={5} overflowY='scroll' h='100%' templateColumns='repeat(2, 1fr)' w='100%' gap='4'>
      {visibleAttrs?.filter(col => col.isVisible)?.map(attr => (
        <GridItem key={attr.id+'-card'}>
          <AttributesCard searchGroups={searches?.map((x,i) => ({
            ...x, 
            fill: groupColorWheel[i % groupColorWheel.length]
          }))} 
            bg='white' 
            attribute={attr.id}/>
        </GridItem>
      ))}
      </Grid>
    </Box>
  )
}