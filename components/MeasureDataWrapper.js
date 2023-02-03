import { useState, useEffect } from 'react';
import measuresHttpClient from '../services/clientapis/MeasuresHttpClient';
import Measure from './Measure';


const groupColorWheel = [
  '#ffbc80', 
  '#8185FF', 
  '#80c3ff', 
  '#bc80ff', 
  '#fb80ff'];

export default function MeasureDataWrapper(props) {
  const { measureId, ...kv } = props;

  const [fullMeasure, setFullMeasure] = useState(undefined);
  const [fullMeasureIsLoading, setFullMeasureIsLoading] = useState(true);

  useEffect(() => {
    if (measureId) {
      fetchGroups()
    }
  }, [measureId])

  async function fetchGroups() {
    setFullMeasureIsLoading(true);
    measuresHttpClient.getData(measureId).then(data => {
      setFullMeasure(data);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setFullMeasureIsLoading(false);
    })
  }

  return (
    <>
      <Measure
        hideTitle
        groupData={fullMeasure?.groups.map((x, index) => 
          ({...x, color: groupColorWheel[index % groupColorWheel.length]}))?.filter(group => 
          fullMeasure?.outcomes?.map(out => out.group)?.includes(group.id))}
        measureData={fullMeasure} />
    </>
  )
}