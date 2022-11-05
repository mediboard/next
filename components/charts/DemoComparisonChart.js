import {
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Brush,
	BarChart,
	Rectangle
} from 'recharts';


// one data point per treatment, each has demo data
export default function DemoComparisonChart(props) {
	const { data, groups, aspect, ...kv } = props;

	return (
		<ResponsiveContainer  w='100%' aspect={aspect || 5} {...kv}>
	  <BarChart
	    height={300}
	    data={data}
	    margin={{
	      top: 5,
	      right: 5,
	      left: 0,
	      bottom: 5,
	    }} {...kv}>
	    <XAxis dataKey="treatName" />
	    <YAxis />
	    <Tooltip />
	    <Legend align='left' />
	    {groups?.map((demo, i) => (
		    <Bar key={demo.name + '-bar'}
		    	stackId='a'
		    	dataKey={demo.name} 
		    	fill={demo.fill} />
    	))}
	  </BarChart>
		</ResponsiveContainer>
	)
}
