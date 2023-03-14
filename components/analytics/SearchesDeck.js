import { useState, useEffect } from 'react';
import {
  Flex,
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

  return ( 
    <Flex bg={fill}>
    {children}
    </Flex>
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
    {searches.map(search => (
      <Text key={search.id + '-card'}>
        {search.name}
      </Text>
    ))}
    </Flex>
  );
}