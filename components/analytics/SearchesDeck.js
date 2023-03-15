import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Flex,
  Button,
  IconButton,
  Text,
  Input,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import SaveSearchButton from '../SaveSearchButton';
import { useAuthenticator } from '@aws-amplify/ui-react';
import studyHttpClient from '../../services/clientapis/StudyHttpClient';


const groupColorWheel = [
  '#ffbc80', 
  '#8185FF', 
  '#80c3ff', 
  '#bc80ff', 
  '#fb80ff'
];


export default function SearchesDeck(props) {
  const [searches, setSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchIsSaving, setSearchIsSaving] = useState(false);

  const { currentSearch, ...kv } = props;

  const router = useRouter();

  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (user?.username) {
      loadSearches()
    }
  }, [user?.username])

  async function loadSearches() {
    setIsLoading(true);
    studyHttpClient.listSearches(user.username).then(data => {
      setSearches(data.searches);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  function SearchCard(args) {
    const { children, id, fill, ...kv } = args;

    return ( 
      <Flex {...kv}>
        <Button w='100%' bg={fill} onClick={() => {router.push({
          pathname: router.pathname,
          query: { search: id }
        })}}>
        {children}
        </Button>

        <IconButton 
          bg='clear'
          color={fill}
          onClick={() => {deleteSearch(id)}}
          icon={<CloseIcon />}/>
      </Flex>
    )
  }

  function deleteSearch(id) {
    studyHttpClient.deleteSearch(id).then(data => {
      console.log(currentSearch);
      if (id === currentSearch?.id) {
        router.push('/studies/browse');
      }
      loadSearches();
    }).catch(error => {
      console.log(error);
    })
  }

  function onNewSearch() {
    setSearchIsSaving(true);
    studyHttpClient.createSearch({
      id: uuidv4(),
      name: "Untitled",
      search_string: currentSearch?.search_string,
      original_user: user.username
    }).then(data => {
      const newSearch = data['search'];
      loadSearches();
      router.push({
        pathname: router.pathname,
        query: { search: newSearch.id },
      });

    }).catch(error => {
      console.log(error);

    }).finally(() => {
      setSearchIsSaving(false);
    })
  }

  return (
    <Flex flexDirection='column' {...kv}>
      <Button onClick={onNewSearch}>{'New Search'}</Button>
    {searches.map((search, i) => (
      <SearchCard key={search.id + '-card'} 
        id={search.id}
        fill={groupColorWheel[i % groupColorWheel.length]}>
        {search.name}
      </SearchCard>
    ))}
    </Flex>
  );
}