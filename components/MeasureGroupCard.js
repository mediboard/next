import { useEffect, useState } from 'react';
import {
	Header,
	Text
} from '@chakra-ui/react';
import {
  ScatterChart,
  Scatter,
  CartesianGrid, 
  XAxis, 
  YAxis, 
  ZAxis,
  Tooltip,
  ResponsiveContainer, 
  Label,
} from 'recharts';
import Tile from './Tile';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';


function prepOutcomes4Chart(measureData, index) {
  return measureData?.analytics?.map(point => ({
    cat: index,
    fill: measureData.fill,
    ...point
  }));
}

export default function MeasureGroupCard(props) {
	const { group, title, conditionId, treatments, ...kv } = props;

  const [measures, setMeasures] = useState([]);
  const [measuresIsLoading, setMeasuresIsLoading] = useState(true);

  useEffect(async () => {
    setMeasures(await Promise.all(treatments?.map(async treat => {
      return {
        treatId: treat.id,
        treatName: treat.name,
        fill: treat.fill,
        analytics: await fetchMeasureValues(treat?.id, conditionId, group?.id)
      }
    })));
  }, [treatments])

  async function fetchMeasureValues(treatmentId, conditionId, measureGroupId) {
    return (await treatmentHttpClient.getDValues(treatmentId, conditionId, measureGroupId)).outcomes;
  }

  const CustomTooltip = ({ active, payload }) => {
    if (!active) {
      return null;
    }

    if (payload[0]){
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].payload.measure_title}`}</p>
          <p className="label">{`${payload[0].payload.study}`}</p>
          <p className="label">{`${payload[0].payload.fill}`}</p>
        </div>
      )
    }
    return null;
  }

	return (
		<Tile {...kv}>
			<Text>{title}</Text>
      <ScatterChart width={1100} height={250}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <XAxis type="number" dataKey="cohen_d" domain={[-1,2]}/>
        <YAxis type="number" dataKey="cat" range={[0,3]} name="name" />
        {measures?.map((data, i) => (
	        <Scatter key={i + '-scatter'}
            data={prepOutcomes4Chart(data, i)} />
      	))}
        <Tooltip content={CustomTooltip} cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px" }} />
      </ScatterChart>
		</Tile>
	)
}