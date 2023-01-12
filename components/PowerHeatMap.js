import React, { useState, useRef } from 'react';
import HeatMap from './Heatmap';
import { 
	Center, 
	Box, 
	Flex,
	HStack,
	Text,
	VStack,
	Table,
	TableContainer,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Spacer,
	StackDivider,
	Badge } from '@chakra-ui/react';


// We want to prefer analytics direct from the study over created
function groupAnalytics(data) {
	let groupsToAnalytics = {};
	data?.forEach(x => {
		x.groups.sort((first, second) => {
			return first.group - second.group;
		});

		let key = x.groups.map(group => group.group).join(',');
		groupsToAnalytics[key] = groupsToAnalytics[key] ? groupsToAnalytics[key].concat([x]) : [x];
	});

	return groupsToAnalytics
}

// Return from study analytics if possible
function selectAnalyticsData(groupsToAnalytics) {
	let groupedList = Object.keys(groupsToAnalytics).map(key => {
		let analyticsFromStudy = groupsToAnalytics[key].filter(x => x.from_study && x.p_value !== undefined);
		let value = analyticsFromStudy.length ? analyticsFromStudy : groupsToAnalytics[key];
		return [key, value];
	});

	return Object.fromEntries(groupedList);
}

// Value is mean of the pvalues and we'ree just taking the first one
function getGroupedValue(analytics) {
	let pValueSum = analytics.map(x => x.p_value).reduce((a,b) => a+b, 0)
	let valueMean = pValueSum / analytics.length;
	return {...analytics[0], value: valueMean};
}

// [{group: "group", variable: "variable", value: "value"}..]
function cleanDataForChart(finalAnalytics) {
	// Blow up the variables
	const final = [];

	let firstGroups = finalAnalytics.map(x => x.groups[0].name);
	let secondGroups = finalAnalytics.map(x => x.groups[1].name);
	let allGroups = [...new Set([...firstGroups, ...secondGroups])];

	for (let i=0; i<allGroups.length; i++) {
		for (let j=0; j<allGroups.length; j++) {
			let group = allGroups[i];
			let variable = allGroups[j];

			let analytic = finalAnalytics.filter(x => {
				let matchOne = x.groups[0].name === group && x.groups[1].name === variable;
				let matchTwo = x.groups[0].name === variable && x.groups[1].name === group;

				return matchOne || matchTwo;
			})[0];

			let groupGroup = analytic?.groups?.filter(g => g.name === group)?.[0];
			let variableGroup = analytic?.groups?.filter(g => g.name === variable)?.[0];

			final.push({
				group: group,
				variable: variable,
				value: analytic?.value || -1,
				outcomeGroupA: groupGroup,
				outcomeGroupB: variableGroup 
			})
		}
	}

	return final;
}

function transformData(analyticsData) {
	let doubleAnalytics = analyticsData?.filter(x => x.groups.length == 2);
	let groupedAnalytics = selectAnalyticsData(groupAnalytics(doubleAnalytics));
	let finalAnalytics = Object.keys(groupedAnalytics).map(x => {
		let analytics = groupedAnalytics[x];
		return getGroupedValue(analytics);
	});

	return cleanDataForChart(finalAnalytics);
}

function addGroupNames(analyticsData, groupData) {
	return analyticsData?.map(analytic => {
		analytic.groups = analytic.groups.map(group => ({
			...group,
			name: groupData.find(x => x.id === group.id)?.title,
			fill: groupData.find(x => x.id === group.id)?.color
		}));

		return analytic;
	});
}

function powerValueToSummary(value) {
	const magValue = Math.round((value * 10) / 2); //0-5
	switch (magValue) {
		case 0:
			return 'Significant Difference';
		case 1:
			return 'Some Difference';
	}

	return 'Insignificant Difference';
}


export default function PowerHeatMap({analyticsData, groupData, outcomeData, dispersion}) {
	const [selectedValue, setSelectedValue] = useState(undefined);
	const [selectedGroup, setSelectedGroup] = useState({});
	const [selectedVariable, setSelectedVariable] = useState({});

	function mapDataToHeatmapProps(heatmapData) {

		const numGroups = heatmapData.map(x => x.group).length;
		const numVars = heatmapData.map(x => x.variable).length;

		const heatmapProps = {
			sumstat: heatmapData,
			margin: {
				right: 10,
				left: 40,
				bottom: 40,
				top: 10
			},
			setSelectedGroup: setSelectedGroup,
			setSelectedValue: setSelectedValue,
			setSelectedVariable: setSelectedVariable,
			selectedGroup: Object.keys(selectedGroup).length === 0 ? undefined : selectedGroup,
			selectedVariable: Object.keys(selectedVariable).length === 0 ? undefined : selectedVariable 
		}

		return heatmapProps;
	}

	function renderComparisonDetails(groupAnalytic, variable, value) {
		const groupName = groupAnalytic.name;
		const variableName = variable.name;

		const groupOutcomes = outcomeData?.filter(x => x.group === groupAnalytic.group);
		const variableOutcomes = outcomeData?.filter(x => x.group === variable.group);

		if (groupOutcomes?.length > 1|| variableOutcomes?.length > 1) {
			console.log("Multiple outcome visualization");
		}

		const groupOutcome = groupOutcomes?.[0] || {};
		const variableOutcome = variableOutcomes?.[0] || {};

		function getDispersionForVis(dispersionValue) {
			let parsedDispersionType = dispersion?.split('.')[1] || 'NA';
			if (dispersionValue) {
				return `${dispersionValue} ${parsedDispersionType}`;
			}

			return 'NA';
		}

		const rowLabels = ["Name", "Value", "Dispersion", "Datapoints"];

		return (
			<VStack 
				border='2px solid black'
				borderRadius='25px'
				w='100%'
				pr='10'
				pl='10'
				pt='2'
				pb='2'
				align='left'>
				<Flex>
					<Center 
						borderRadius='50%'
						backgroundColor={'blue'}
						opacity='.4'
						p='2'
						w='60px'
						h='60px'
						><Text fontSize='xl' opacity='1' color='white'>{Math.round(value*100) / 100}</Text></Center>
				</Flex>

				<TableContainer>
					<Table variant='simple'>
				    <Thead>
				      <Tr>
				        <Th>{"Name"}</Th>
				        <Th isNumeric>{"Value"}</Th>
				        <Th isNumeric>{"Dispersion"}</Th>
				        <Th isNumeric>{"Participants"}</Th>
				      </Tr>
				    </Thead>
		        <Tbody>
				      <Tr>
				        <Td>{groupName}</Td>
				        <Td isNumeric>{groupOutcome.value}</Td>
				        <Td isNumeric>{groupOutcome.dispersion}</Td>
				        <Td isNumeric>{groupOutcome.no_participants}</Td>
				      </Tr>
				      <Tr>
				        <Td>{variableName}</Td>
				        <Td isNumeric>{variableOutcome.value}</Td>
				        <Td isNumeric>{variableOutcome.dispersion}</Td>
				        <Td isNumeric>{variableOutcome.no_participants}</Td>
				      </Tr>
				    </Tbody>
					</Table>
				</TableContainer>

{/*				<SimpleGrid columns={3} rows={4} textAlign='center'>
					<Center><Badge>{"Name"}</Badge></Center>
					<Text>{groupName}</Text>
					<Text>{variableName}</Text>

					<Center><Badge>{"Value"}</Badge></Center>
					<Text>{groupOutcome.value || "N/A"}</Text>
					<Text>{variableOutcome.value || "NA"}</Text>

					<Center><Badge>{"Dispersion"}</Badge></Center>
					<Text>{getDispersionForVis(groupOutcome.dispersion)}</Text>
					<Text>{getDispersionForVis(variableOutcome.dispersion)}</Text>

					<Center><Badge>{"Participants"}</Badge></Center>
					<Text>{getDispersionForVis(groupOutcome.participants)}</Text>
					<Text>{getDispersionForVis(variableOutcome.participants)}</Text>
				</SimpleGrid>
*/}

{/*				<HStack
					align='start'
					divider={<StackDivider borderColor='gray.200' />}>
					<VStack align='left' spacing={2}>
						{rowLabels.map(label => (
							<Center h='24px'><Badge w='100%'>{label}</Badge></Center>
						))}
					</VStack>
					<VStack spacing={2}>
						<Text>{groupName}</Text>
						<Text>{groupOutcome.value || "N/A"}</Text>
						<Text>{getDispersionForVis(groupOutcome.dispersion)}</Text>
						<Text>{`${groupOutcome.no_participants} participants`}</Text>
					</VStack>
					<VStack spacing={2}>
						<Text>{variableName}</Text>
						<Text>{variableOutcome.value || "NA"}</Text>
						<Text>{getDispersionForVis(variableOutcome.dispersion)}</Text>
						<Text>{`${variableOutcome.no_participants} participants`}</Text>
					</VStack>
				</HStack>
*/}			</VStack>
		);
	}

	return (
		<Flex
			flexDirection='column'
			w='100%' 
			pl='1%'
			pr='1%'>
			<Center pt='3' flexDirection='column'>
				<Flex flexWrap='wrap' alignItems='center' columnGap={3} rowGap={3}>
					<Box bg='gray.300' w={10} h={10} borderRadius={4}/>
					<Text>{'Not Available'}</Text>

					<Box bg='red.300' w={10} h={10} borderRadius={4}/>
					<Text>{'No Difference'}</Text>

					<Box bg='green.300' w={10} h={10} borderRadius={4}/>
					<Text>{'Significantly Different'}</Text>
				</Flex>
				<HeatMap {...mapDataToHeatmapProps(transformData(addGroupNames(analyticsData, groupData)))}/>
			</Center>
			<Spacer />
		</Flex>
	);
}