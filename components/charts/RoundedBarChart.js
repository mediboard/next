import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Bar,
  Brush,
  BarChart,
  Rectangle
} from 'recharts';


const getDataGroups = (data) => {
  console.log(data);

  return Object.keys(data).filter(key => key.includes('group'));
};

export default function RoundedBarChart(props) {
  const { data, fills, aspect, ...kv } = props;

  return (
    <ResponsiveContainer  w='100%' aspect={aspect || 5} >
    <BarChart
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 5,
        left: 0,
        bottom: 5,
      }} {...kv}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend align='left' />
      {getDataGroups(data?.[0] || {})?.map((dataGroup) => (
        <Bar key={dataGroup + '-bar'} 
          shape={<Rectangle radius={[10, 10, 0, 0]}/>}
          dataKey={dataGroup} 
          fill={fills[dataGroup]} />
      ))}
    </BarChart>
    </ResponsiveContainer>
  )
}