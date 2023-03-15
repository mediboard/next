import { useState, useEffect } from 'react';
import {
  Skeleton,
  Heading,
  Flex
} from '@chakra-ui/react';
import studyHttpClient from '../../services/clientapis/StudyHttpClient';
import RoundedBarChart from '../charts/RoundedBarChart';
import Tile from '../Tile';
import { 
  isEnum,
  parseMeasureType,
  capitalize, 
  parseQueryString } from '../../utils';


function prepDataForChart(dataGroups, showNA) {
  const newData = [];
  const fills = {};
  if (!dataGroups?.length) { return [[], []] }

  // Assuming all keys are present for each
  Object.keys(dataGroups?.[0]?.data || {})?.forEach((key,i) => {
    const parsedKey = isEnum(key) ? parseMeasureType(key) : key;

    if (parsedKey != 'NA' || (parsedKey=='NA' && showNA)) {
      const dataPoint = { name: parsedKey };

      dataGroups.forEach(dataGroup => {
        dataPoint[`group_${dataGroup?.id}`] = dataGroup.data[key];
      })

      newData.push(dataPoint);
    }
  })

  dataGroups.forEach(dataGroup => {
    fills[`group_${dataGroup?.id}`] = dataGroup.fill;
  })

  return [newData, fills];
}

export default function AttributesCard(props) {
  const { attribute, showNA, searchGroups, ...kv }  = props;

  const [data, setData] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    if (attribute && searchGroups?.length) {
      fetchData();
    }
  }, [attribute, searchGroups])

  async function fetchData() {
    setDataIsLoading(true);
    Promise.all(searchGroups.map(async group => ({
      data: (await studyHttpClient.getStudyAttributes(
        attribute, 
        parseQueryString(group.search_string)))[attribute],
      ...group
    }))).then(data => {
      setData(data);

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