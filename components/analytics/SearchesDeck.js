import { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Input,
} from '@chakra-ui/react';
import SaveSearchButton from '../SaveSearchButton';


export default function SearchesDeck(props) {
  const [searches, setSearches] = useState([]);
  const [newName, setNewName] = useState(undefined);
  
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