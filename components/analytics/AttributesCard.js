import { useState, useEffect } from 'react';
import {
  Box
} from '@chakra-ui/react';
import studyHttpClient from '../../services/clientapis/StudyHttpClient';
import RoundedBarChart from '../charts/RoundedBarChart';
import Tile from '../Tile';
import { isEnum, parseMeasureType } from '../../utils';


const groupColorWheel = [
  '#ffbc80', 
  '#8185FF', 
  '#80c3ff', 
  '#bc80ff', 
  '#fb80ff'
];

function prepDataForChart(data) {
  const newData = [];
  const fills = {};

  Object.keys(data).forEach((key,i) => {
    newData.push({
      name: isEnum(key) ? parseMeasureType(key) : key,
      group_a: data[key]
    });

  })

  newData.sort((a,b) => (b.group_a - a.group_a))

  fills['group_a'] = groupColorWheel[0];

  return [newData, fills];
}

export default function AttributesCard(props) {
  const { attribute, ...kv }  = props;

  const [data, setData] = useState({});
  const [datIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    if (attribute) {
      fetchData();
    }
  }, [attribute])

  async function fetchData() {
    setDataIsLoading(true);
    studyHttpClient.getStudyAttributes(attribute).then(response => {
      setData(response[attribute]);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setDataIsLoading(false);
    })
  }

  return (
    <Tile>
      <RoundedBarChart 
        data={prepDataForChart(data)[0]}
        fills={prepDataForChart(data)[1]}/>
    </Tile>
  )
}