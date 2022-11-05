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

const BAR_GAP=2;
const BAR_CATEGORY_GAP=5;
const MAX_BAR_SIZE=12;

export function CalculateOffset(no_groups) {
	return BAR_CATEGORY_GAP + MAX_BAR_SIZE*(no_groups+1)*BAR_GAP;
}

const prepData = (effectsGroups) => {
	const flattenedData = effectsGroups?.map(effectGroup => {
		return effectGroup.effects?.map(data => {
			let newEffect = {};
			newEffect[effectGroup.treatName + '-value'] = Math.round((data.effected / data.at_risk) * 100);
			newEffect['name'] = data.name;

			return newEffect;
		});
	})?.flat();

	const grouped = {};
	flattenedData?.forEach(x => {
		grouped[x.name] = { ...x, ...grouped?.[x.name] };
	})

	return Object.values(grouped);
}

export default function EffectsFullBarChart(props) {
	const { effectsGroups, fills, aspect, ...kv } = props;

	return (
		<ResponsiveContainer  w='100%' aspect={aspect || 5} >
	  <BarChart
	    width={CalculateOffset(effectsGroups?.length) * prepData(effectsGroups)?.length}
	    height={300}
	    data={prepData(effectsGroups)}
	    barGap={BAR_GAP}
	    barCategoryGap={BAR_CATEGORY_GAP}
	    maxBarSize={MAX_BAR_SIZE}
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
	    {effectsGroups?.map((effectGroup, i) => (
		    <Bar key={effectGroup.treatName + '-bar'} 
	        shape={<Rectangle radius={[10, 10, 0, 0]}/>}
		    	dataKey={effectGroup.treatName + '-value'} 
		    	fill={fills[i]} />
    	))}
	  </BarChart>
		</ResponsiveContainer>
	)
}