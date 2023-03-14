import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  Flex,
  Checkbox,
  VStack,
  Button,
  Skeleton
} from '@chakra-ui/react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import studyHttpClient from '../services/clientapis/StudyHttpClient';


export default function AnalyticsSelector(props) {
  const [selectedSearches, setSelectedSearches] = useState([]);
  const [searchesAreLoading, setSearchesAreLoading] = useState(true);
  const [searches, setSearches] = useState([]);

  const { user } = useAuthenticator((context) => [context.user]);

  const router = useRouter();

  useEffect(() => {
    if (user?.username) {
      loadSearches()
    }
  }, [user?.username])

  async function loadSearches() {
    setSearchesAreLoading(true);
    studyHttpClient.listSearches(user.username).then(data => {
      setSearches(data.searches);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setSearchesAreLoading(false);
    })
  }

  function onOptionToggle(searchOption) {
    if (selectedSearches?.map(search => search.id)?.includes(searchOption.id)) {
      setSelectedSearches(selectedSearches.filter(val => val.id != searchOption?.id));
      return;
    }

    setSelectedSearches([...selectedSearches, searchOption]);
  }

  return (
    <VStack align='start'>
    {searchesAreLoading && [... new Array(8)].map((x,i) => (
      <Flex key={i+'-checkbox-skeleton'} w='100%'>
        <Skeleton w={5} h={5} mr={2} mb={2}/>
        <Skeleton w={'70%'} h={5} />
      </Flex>
    ))}
    {!searchesAreLoading && searches.map((option) => (
      <Flex key={option.id+'-checkbox'}>
        <Checkbox
          isChecked={selectedSearches?.map(search => search.id)?.includes(option.id)}
          onChange={(e) => onOptionToggle(option)}
          mr="2"/>
        {option.name}
      </Flex>
    ))}
      <Button
        onClick={() => {router.push({
          pathname: '/studies/analysis',
          query:  {searches: selectedSearches?.map(x => x.id)?.join(',')}
        })}}
        isDisabled={!selectedSearches?.length}>
      {'Analyze'}
      </Button>
    </VStack>
  )
}