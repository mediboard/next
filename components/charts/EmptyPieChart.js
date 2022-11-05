import { 
	PieChart,
	Sector,
	Pie } from 'recharts';
import { Text } from '../../styles/themeStyles';

const mockData = [
	{
		value: 50,
		sub_type: 'w'
	},
	{
		value: 30,
		sub_type: 'x'
	},
	{
		value: 10,
		sub_type: 'y'
	},
	{
		value: 5,
		sub_type: 'z'
	}
];

function PieChartNameLabel(props) {
	const RADIAN = Math.PI / 180;
  const { dataType, cx, cy, midAngle, innerRadius, outerRadius, 
  	startAngle, endAngle, fill, payload, percent, value } = props;
  const name = payload.sub_type;

	return (
		<g>
			<text x={cx} y={cy} textAnchor="middle">
				<tspan 
					fontSize={Text.baseStyle.fontSize} 
					fontWeight={Text.variants.thick.fontWeight}>
						{dataType + ' DATA'}
				</tspan>
				<tspan
					x={cx} dy="1.2em"
					fontSize={Text.baseStyle.fontSize} 
					fontWeight={Text.variants.thick.fontWeight}>
						{'UNAVAILABLE'}
				</tspan>
			</text>
			<Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
		</g>
	)
}

export default function EmptyPieChart(dataType) {
	return (
		<PieChart>
		  <Pie
			  data={mockData} 
		  	activeShape={<PieChartNameLabel dataType={dataType}/>}
			  dataKey="value" 
			  nameKey="sub_type" 
			  cx="50%" 
			  cy="50%" 
			  innerRadius={'70%'} 
			  outerRadius={'90%'} 
			  fill={'grey'} />
		</PieChart>
	)
}