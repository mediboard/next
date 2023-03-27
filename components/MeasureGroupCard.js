import { useEffect, useState } from 'react';
import {
	Header,
	Text
} from '@chakra-ui/react';
import Tile from './Tile';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import MeasuresTreatmentWrapper from './MeasuresTreatmentWrapper';
import MeasureGroupChart from './MeasureGroupChart';
import appConfig from '../services/AppConfig';


function prepData4Chart(measuresData) {
  const chartData = {};
  Object.keys(measuresData).forEach((key,i) => {
    const dataPoints = measuresData[key].map(
      measure => measure.results.map(
        result => ({
          x: result.d_value,
          measure_title: measure.title,
          y: i,
          study: measure.study
        }))
      ).flat();

    chartData[key] = dataPoints;
  })

  return chartData;
}

export default function MeasureGroupCard(props) {
	const { group, conditionId, treatments, ...kv } = props;

  const [measuresData, setMeasuresData] = useState({});
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    if (treatments?.length && group?.id) {
      treatments.filter(treat => measuresData[treat.id] == null).forEach(treat => {
       loadData(treat.id, group.id);
      });
    }
  }, [treatments, group])

  async function loadData(treatmentId, measureGroupId) {
    const treatmentIds = [treatmentId, appConfig.nullTreatment];

    setDataIsLoading(true);
    treatmentHttpClient.analyzeTreatments(treatmentIds, measureGroupId).then(data => {
      const newEntry = {};
      newEntry[treatmentId] = data['results']
      setMeasuresData({...measuresData, ...newEntry});

    }).catch(error => {
      console.log(error);

    }).finally(() => {
      setDataIsLoading(false);
    })
  }

	return (
		<Tile {...kv} textAlign='center'>
			<Text>{group.name}</Text>
      <MeasureGroupChart data={prepData4Chart(measuresData)} />
		</Tile>
	)
}