import { useState } from 'react';
import {
  Input,
  IconButton,
  Flex
} from '@chakra-ui/react';
import PageBody from '../components/PageBody';
import { SearchIcon } from '@chakra-ui/icons';
import MeasuresTile from '../components/MeasuresTile';
import measuresHttpClient from '../services/clientapis/MeasuresHttpClient';


const modes = [
  'treatments',
  'measures',
  'studies',
  'conditions'
];

export default function Search() {
  const [mode, setMode] = useState('treatments');
  const [input, setInput] = useState('');

  const [measures, setMeasures] = useState([]);
  const [measuresIsLoading, setMeasuresIsLoading] = useState(false);

  function onSearchClick() {
    setMeasuresIsLoading(true);
    measuresHttpClient.search(input).then(data => {
      setMeasures(data.measures);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setMeasuresIsLoading(false);
    })
  }

  return (
    <PageBody>
      <Flex>
        <Input onChange={(e) => setInput(e.target.value)}/>
        <IconButton onClick={onSearchClick} icon={<SearchIcon />}/>
      </Flex>
      <Flex flexDirection='column'>
      {measures?.map(measure => (
        <MeasuresTile measure={measure}/>
      ))}
      </Flex>
    </PageBody>
  )
}