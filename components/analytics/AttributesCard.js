import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Skeleton,
  Heading,
  Flex
} from '@chakra-ui/react';
import studyHttpClient from '../../services/clientapis/StudyHttpClient';
import RoundedBarChart from '../charts/RoundedBarChart';
import Tile from '../Tile';
import { isEnum, parseMeasureType, capitalize } from '../../utils';


const groupColorWheel = [
  '#ffbc80', 
  '#8185FF', 
  '#80c3ff', 
  '#bc80ff', 
  '#fb80ff'
];

function prepDataForChart(data, showNA) {
  const newData = [];
  const fills = {};

  Object.keys(data)?.forEach((key,i) => {
    const parsedKey = isEnum(key) ? parseMeasureType(key) : key;

    if (parsedKey != 'NA' || (parsedKey=='NA' && showNA)) {
      newData.push({
        name: parsedKey,
        group_a: data[key]
      });
    }

  })

  newData.sort((a,b) => (b.group_a - a.group_a))

  fills['group_a'] = groupColorWheel[0];

  return [newData, fills];
}

export default function AttributesCard(props) {
  const { attribute, showNA, ...kv }  = props;

  const router = useRouter();

  const [data, setData] = useState({});
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    if (attribute && router.isReady) {
      fetchData();
    }
  }, [attribute, router.isReady])

  async function fetchData() {
    setDataIsLoading(true);
    studyHttpClient.getStudyAttributes(attribute, router.query).then(response => {
      setData(response[attribute]);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setDataIsLoading(false);
    })
  }

  return (
    <Tile isLoaded={!dataIsLoading} {...kv}>
      <Flex w='100%' justifyContent='center'>
        <Heading size='sm'>
        {capitalize(attribute)}
        </Heading>
      </Flex>
      <RoundedBarChart 
        data={prepDataForChart(data, showNA)[0]}
        fills={prepDataForChart(data)[1]}/>
    </Tile>
  )
}