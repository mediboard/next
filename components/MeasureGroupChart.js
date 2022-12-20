import { useState, useEffect } from 'react';
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
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';


const CustomTooltip = ({ active, payload }) => {
  if (!active) {
    return null;
  }

  if (payload[0]){
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].payload.measure_title}`}</p>
        <p className="label">{`${payload[0].payload.study}`}</p>
      </div>
    )
  }

  return null;
}

function prepOutcomes4Chart(measureData, index) {
  return measureData?.map(point => ({
    cat: index,
    ...point
  }));
}

export default function MeasureGroupChart(props) {
	const { measures, ...kv } = props;

	const [measureData, setMeasureData] = useState([]);

	useEffect(() => {
		if (Object.keys(measures)?.length) {
			getTreatmentData();
		}
	}, [measures])

	async function getTreatmentData() {
		const treatmentData = await Promise.all(Object.keys(measures)?.map(async treatment => {
			const measureIds = measures[treatment]?.measures?.map(x => x.id);

			return await fetchMeasuresData(measureIds, measures[treatment]?.treatment?.id);
		}));

		setMeasureData(treatmentData);
	}

	async function fetchMeasuresData(measureIds, treatmentId) {
		return await treatmentHttpClient.getMeasureData(treatmentId, measureIds);
	}

	return (
    <ScatterChart width={1100} height={250}
      margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
      <XAxis type="number" dataKey="cohen_d" domain={[-1,2]}/>
      <YAxis type="number" dataKey="cat" range={[-1,3]} name="name" />
      {measureData?.map((data, i) => (
        <Scatter key={i + '-scatter'}
          data={prepOutcomes4Chart(data, i)} />
    	))}
      <Tooltip content={CustomTooltip} cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px" }} />
    </ScatterChart>
	)
}