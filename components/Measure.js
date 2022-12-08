import { useRef, useEffect } from 'react';
import {
	Flex,
	VStack,
	Text,
	Heading,
	Box,
	Button
} from '@chakra-ui/react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { isAdminUser } from '../utils';
import OutcomeDataChart from './OutcomeDataChart';
import GroupsDeck from './GroupsDeck';
import PowerHeatMap from './PowerHeatMap';
import OutcomeTable from './OutcomeTable';
import StudySection from './StudySection';
import { ExpandableText } from './ExpandableText';
import { parseMeasureType } from '../utils';
import { toPng } from 'html-to-image';
import download from 'downloadjs';


function addGroupProps(outcome, groups) {
	let group = groups.filter(x => x.id === outcome.group).pop();
	return {
		...outcome, 
		xAxis: outcome.title === 'NA' ? group?.title : outcome.title,
		groupName: group?.title,
		fill: group?.color
	};
}

export default function Measure(props) {
	const { 
		measureData,
		groupData,
		hideTitle,
		...kv } = props;

  const { user } = useAuthenticator((context) => [context.user]);

	const chartRef = useRef(undefined);
	const expandRef = useRef(null);

	function onClick() {
		toPng(chartRef.current).then(function (dataUrl) {
			download(dataUrl, 'my-node.png');
		});
	}

	return (
		<VStack spacing={8} align='stretch' w='100%'>
			{!hideTitle && <Text fontWeight='600' textAlign='center'>{measureData?.title}</Text>}

			{/*<Text textAlign='left' fontSize='13px' fontWeight='500'>{measureData?.description}</Text>*/}
			<StudySection header='Description'>
				<ExpandableText ref={expandRef} textAlign='center' noOfLines={2}><Text>{measureData?.description}</Text></ExpandableText>
			</StudySection>
			{	isAdminUser(user?.username) && <Button onClick={onClick}>Download Chart</Button> }

			<StudySection header='Groups'>
	 			<GroupsDeck groups={groupData} />
			</StudySection>

			{measureData?.analytics?.length && 
			<StudySection header='Comparisons'>
				<PowerHeatMap
					outcomeData={measureData?.outcomes}
					groupData={groupData}
					analyticsData={measureData?.analytics || []}/>
			</StudySection>
			}

			<StudySection header='Data'>
				<Box ref={chartRef} h='100%'>
					<OutcomeDataChart 
					{...{
						unit: measureData?.units,
						borderRadius: 4,
						outcomes: measureData?.outcomes?.map(x => (addGroupProps(x, groupData))), 
						groups: groupData}} /> 
					<OutcomeTable
						mt={[0, 7]}
						borderRadius={4}
						border='1px solid #cccccc'
						outcomes={measureData?.outcomes?.map(x => (addGroupProps(x, groupData)))}/>
				</Box>
			</StudySection>

		</VStack>
	);
}