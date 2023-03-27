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
import appConfig from '../services/AppConfig';


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

export default function MeasureGroupChart(props) {
	const { data, ...kv } = props;

	return (
    <ScatterChart width={1100} height={250}
      margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
      <XAxis type="number" dataKey="x" domain={[-1,2]}/>
      <YAxis type="number" dataKey="y" range={[-1,3]} name="name" />
      {Object.keys(data)?.map((key) => (
        <Scatter key={key + '-scatter'} data={data[key]} />
    	))}
      <Tooltip content={CustomTooltip} cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px" }} />
    </ScatterChart>
	)
}