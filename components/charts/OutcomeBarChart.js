import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Legend,
	Tooltip,
	Bar,
	Label,
	ResponsiveContainer
} from 'recharts';
import {
	Flex,
	Heading,
	Text,
	Box,
	Spacer,
	Show,
	Hide,
} from '@chakra-ui/react';


function payloadIsGrouped(payload) {
	return payload.fill == null;
}

function CustomToolTip(props) {
	const { active, payload, label } = props;

  if (active && payload && payload.length > 1) {
  	const dataPoint = payload[1].payload;
  	let axisName = dataPoint?.xAxis;
  	let groups = [];

  	if (payloadIsGrouped(dataPoint)) {
  		for (const [key, value] of Object.entries(dataPoint)) {
  			if (key.includes('-fill')) {
  				let groupName = key.split('-')[0];

  				let groupData = {
  					name: groupName,
  					fill: value,
  					value: dataPoint[groupName]
  				};

  				groups.push(groupData);
  			}
  		}
  	} else {
  		let groupData = {
  			name: dataPoint.xAxis,
  			fill: dataPoint.fill,
  			value: dataPoint.value
  		};

  		groups.push(groupData);
  	}

  	return (
      <Flex 
      	bg={'white'}
      	w='270px'
        flexDirection={'column'}
        borderRadius={'base'}
        p={2}>
        <Heading fontSize={'sm'} mb={2}>{`${axisName}`}</Heading>
        {groups.map(group => (
        	<Flex
        		key={group.name+'-tooltip'}
        		align='center' mb={2}>
        		<Box
        			w='10%'
        			h={0}
        			pb='10%'
        			mr={1}
        			borderRadius='50%'
        			bg={group.fill}/>
	        	<Text>{group.name}</Text>
	        	<Spacer />
	        	<Text>{group.value}</Text>
        	</Flex>
        ))}
      </Flex>
		);
  }

  return null;
}

export default function OutcomeBarChart(props) {
	const { data, groupings, colorMapping, unit, ...kv } = props;

	function groupData(data) {
		const title2Data = {};

		data.forEach(point => {
			if (!Object.keys(title2Data)?.includes(point.title)) {
				title2Data[point.title] = {};
				title2Data[point.title]['xAxis'] = point.title;
			}

			title2Data[point.title][point.groupName] = point.value;
			title2Data[point.title][point.groupName+'-fill'] = point.fill;
		})

		return Object.values(title2Data);
	}

	return (
		<>
		<Hide above='sm'>
		<ResponsiveContainer aspect={1.5} w='99%' {...kv}>
			<BarChart data={groupings?.length > 1 ? groupData(data) : data}>
			  <CartesianGrid vertical={false} />
			  <Tooltip content={<CustomToolTip />}/>
			  {groupings?.map(grouping => (
			  	<Bar key={'outcome-group-bar-'+grouping.name}
			  		fill={grouping.fill}
			  		dataKey={grouping.name}/>
		  	))}
			</BarChart>
		</ResponsiveContainer>
		</Hide>

		<Show above='sm'>
		<ResponsiveContainer aspect={3} w='99%' {...kv}>
			<BarChart data={groupings?.length > 1 ? groupData(data) : data}>
			  <XAxis dataKey="xAxis" />
			  <CartesianGrid vertical={false} />
			  <Tooltip content={<CustomToolTip />}/>
			  {groupings?.map(grouping => (
			  	<Bar key={'outcome-group-bar-'+grouping.name}
			  		fill={grouping.fill}
			  		dataKey={grouping.name}/>
		  	))}
			</BarChart>
		</ResponsiveContainer>
		</Show>
		</>
	)
}