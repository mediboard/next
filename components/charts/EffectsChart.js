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
import { getBaseLog } from '../../../../utils';


const prepData = (data) => {
  if (data == null) { return []; }

  return data?.map(x => ({
    symptom: x.name,
    number_studies: x.no_studies,
    number_effected: getBaseLog(10, x.effected),
    frequency: Math.round((x.effected / x.at_risk) * 100)
  }))
}

export default function EffectsChart(props) {
  const { aspect, data, fills, ...kv} = props;
  const CustomTooltip = ({ active, payload }) => {
      if (!active) {
        return null;
      }
      if (payload[0]){
        return (
          <div className="custom-tooltip">
            <p className="label">{`${payload[0].payload.symptom}`}</p>
            <p className="label">{`Occured In: ${payload[0].payload.number_studies} studies`}</p>
            <p className="label">{`Affected: ${Math.round(Math.pow(10, payload[0].payload.number_effected))} particpants`}</p>
            <p className="label">{`Symptom Frequency: ${payload[0].payload.frequency}%`}</p>
          </div>
        )
      }
      return null;
  }

	return (
		<ResponsiveContainer  w='100%' aspect={aspect || 5} >
      <ScatterChart width={730} height={250}
        margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
        <XAxis type="number" dataKey="number_effected" name="number effected">
          <Label value='Total People Effected (log)' offset={-5} position='insideBottom' style={{textAnchor: 'middle'}} />
        </XAxis>
        <YAxis angle={-45} type="number" range={[1, 100]} dataKey="frequency" name="frequency" unit="%" >
          <Label angle={-90} value='Frequency' offset={20} position='insideLeft' style={{textAnchor: 'end'}} />
        </YAxis>
        <ZAxis type="number" dataKey="number_studies" range={[30, 200]} name="number effected" unit=" effected" />
        {data?.map((points, i) => (
          <Scatter name="Side Effects" data={prepData(points)} fill={fills?.[i] || 'rgb(129, 133, 255)'}/>
        ))}
        <Tooltip content={CustomTooltip} cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px" }} />
      </ScatterChart>
		</ResponsiveContainer>
	)
}
