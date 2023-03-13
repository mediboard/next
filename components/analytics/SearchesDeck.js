import { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Input,
} from '@chakra-ui/react';
import SaveSearchButton from '../SaveSearchButton';
import { useAuthenticator } from '@aws-amplify/ui-react';
import studyHttpClient from '../../services/clientapis/StudyHttpClient';


export default function SearchesDeck(props) {
  const [searches, setSearches] = useState([]);
  const [newName, setNewName] = useState(undefined);
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
      <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
      <SaveSearchButton name={newName} shallow={true}>
      {'Save Current Search'}
      </SaveSearchButton>
    {searches.map(search => (
      <Text key={search.id + '-card'}>
        {search.name}
      </Text>
    ))}
    </Flex>
  );
}