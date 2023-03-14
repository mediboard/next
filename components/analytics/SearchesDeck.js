import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  Text,
  Input,
} from '@chakra-ui/react';
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

export function SearchCard(props) {
  const { children, id, fill, ...kv } = props;

  const router = useRouter();

  return ( 
    <Button bg={fill} onClick={() => {router.push({
      pathname: router.pathname,
      query: { search: id }
    })}}>
    {children}
    </Button>
  )
}


export default function SearchesDeck(props) {
  const [searches, setSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <Flex flexDirection='column' {...props}>
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