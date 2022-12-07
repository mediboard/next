import { useState } from 'react';
import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Legend,
	Tooltip,
	Label,
	Bar,
	Cell,
	ResponsiveContainer
} from 'recharts'
import {
	Flex,
	Heading,
	Text,
	Box,
	Spacer
} from '@chakra-ui/react';
import GroupedWhiskerPlot from './GroupedWhiskerPlot';
import BasicWhiskerPlot from './BasicWhiskerPlot';
import BoundedLinePlot from './BoundedLinePlot';


const DotBar = (rectangleProps) => {
  const { x, y, width, height } = rectangleProps;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return (
    <line
      x1={x + width / 2}
      y1={y + height}
      x2={x + width / 2}
      y2={y}
      stroke={'#000'}
      strokeWidth={5}
      stroke-dasharray={'5'}
    />
  );
};

const HorizonBar = (rectangleProps) => {
  const { x, y, width, height } = rectangleProps;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return <line x1={x} y1={y} x2={x + width} y2={y} stroke={'#000'} strokeWidth={3} />;
};

function appendGroups(data, prefix) {
	return data.map((x, index) => {

		let newPoint = {};
		let dataPrefix = prefix === undefined ? x.group : prefix;
		newPoint[dataPrefix + '-min'] = x.min;
		newPoint[dataPrefix + '-bottomWhisker'] = x.bottomWhisker;
		newPoint[dataPrefix + '-bottomBox'] = x.bottomBox;
		newPoint[dataPrefix + '-bar'] = x.bar;
		newPoint[dataPrefix + '-topBox'] = x.topBox;
		newPoint[dataPrefix + '-topWhisker'] = x.topWhisker;
		newPoint['xAxis'] = x.xAxis;
		newPoint['group-'+x.group] = x.group;
		newPoint['group'] = x.group;
		newPoint['groupName-'+x.group] = x.groupName;
		newPoint['fill'] = x.fill;

		return newPoint;
	});
}

function groupDataByGroup(groupData) {
	let axisData = [...new Set(groupData.map(x => x.group))];

	return axisData.map(x => {
		let data = groupData.filter(y => y.group === x).reduce(function(acc, x) {
	    for (var key in x) acc[key] = x[key];
	    return acc;
		}, {});

		return {
			...data
		}
	})
}

function trimValue(value) {
	return Math.round(value * 10000) / 10000;
}

function payloadIsGrouped(payload) {
	return payload.fill !== undefined;
}

function CustomToolTip({ active, payload, label }) {
  if (active && payload && payload.length > 1) {
  	let dataPoint = payload[1].payload;
  	let axisName = dataPoint?.xAxis;
  	let groups = [];
  	if (payloadIsGrouped(payload[1])) {
	  	for (const [key, value] of Object.entries(dataPoint)) {
	  		if (key.includes('group-')) {
	 				let id = value;
	  			let groupPayload = payload.filter(x => x.name === id+'-bottomBox').pop();
					let groupData = {
						id: id,
						name: dataPoint['groupName-'+id],
						fill: groupPayload?.fill,
						value: trimValue(parseFloat(dataPoint[id+'-min'] + dataPoint[id+'-bottomBox']))
					};

					groups.push(groupData)
	  		}
			}
		} else {
			let groupData = {
				id: dataPoint['group'],
				name: dataPoint['groupName-'+dataPoint['group']],
				fill: dataPoint['fill'],
				value: trimValue(parseFloat(dataPoint['-min'] + dataPoint['-bottomBox']))
			};

			groups.push(groupData)
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
        		key={group.id+'-tool-tip'}
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

function groupDataByXAxis(groupData) {
	let axisData = [...new Set(groupData.map(x => x.xAxis))];

	return axisData.map(x => {
		let data = groupData.filter(y => y.xAxis === x).reduce(function(acc, x) {
	    for (var key in x) acc[key] = x[key];
	    return acc;
		}, {});

		let groupedDataPoint = {
			xAxis: x,
			...data,
		}

		delete groupedDataPoint.fill;

		return groupedDataPoint;

	})
}

function NoDataOverview(message) {
	return (
		<Flex
			bg={'white'}
			p={2}
			w='70%'>
			<Text>{message}</Text>
		</Flex>
	)
}

export default function WhiskerPlot({
	sumstat,
	type,
	grouped,
	forceReload,
	unit,
	height,
	colorMapping,
	defaultFill
}) {

	if (grouped) {
		// return (
		// 	<GroupedWhiskerPlot unit={unit} height={height || 500} sumstat={sumstat}/>
		// )

		return (
			<BoundedLinePlot unit={unit} height={height || 300} sumstat={sumstat}/>
		)
	}

	return (
		<BasicWhiskerPlot unit={unit} height={height || 400} sumstat={sumstat}/>
	)
}