import { useState } from 'react';
import { 
	PieChart,
	Pie,
	Label,
	Cell,
	ResponsiveContainer,
	Sector } from 'recharts';
import { Box } from '@chakra-ui/react';
import EmptyPieChart from './EmptyPieChart';
import { Text } from '../../styles/themeStyles';


function PieChartNameLabel(props) {
	const RADIAN = Math.PI / 180;
  const { text, cx, cy, midAngle, innerRadius, outerRadius, 
  	startAngle, endAngle, fill, payload, percent, value } = props;
  const name = payload.sub_type;

	return (
		<g>
			<text x={cx} y={cy} fill={Text.baseStyle.color} textAnchor="middle">
				<tspan 
					fontSize={'12px'} 
					fontWeight={Text.variants.thick.fontWeight}>
						{`${name} ${(percent * 100).toFixed(2)}%`}
				</tspan>
				<tspan
					x={cx} dy="1.2em"
					fontSize={'12px'} 
					fontWeight={Text.variants.thick.fontWeight}>
						{`${value.toFixed(0)} Subjects`}
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
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 4}
        outerRadius={outerRadius + 8}
        fill={fill}
      />
		</g>
	)
}

export default function DemographicsChart(props) {
	const { name, fill, data, colorWheel, ...kv } = props;

	const [activeIndex, setActiveIndex] = useState(0);

	function onPieEnter(_, index) {
		setActiveIndex(index);
	}

	const filterDemoData = (newData) => {
    if (newData === undefined || newData.length === 0) {
      return [];
    }

    return newData
	};

	return (
		<ResponsiveContainer w='100%' aspect={props.aspect || 1}>
		{filterDemoData(data).length === 0 ? EmptyPieChart(name) : 
			<PieChart>
			  <Pie
			  	activeIndex={activeIndex}
			  	activeShape={<PieChartNameLabel text={name} />}
				  data={filterDemoData(data)} 
				  dataKey="value" 
				  nameKey="sub_type" 
				  cx="50%" 
				  cy="50%" 
				  innerRadius={'75%'} 
				  outerRadius={'95%'}
				  paddingAngle={4}
				  onMouseEnter={onPieEnter}>
				  {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorWheel[index % colorWheel?.length]} />
          ))}
			  </Pie>
			</PieChart>
		}
		</ResponsiveContainer>
	)
}