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
import { parseMeasureType } from '../utils';
import { toPng } from 'html-to-image';
import download from 'downloadjs';


export default function Measure(props) {
	const { 
		measureData,
		groupData,
		hideTitle,
		...kv } = props;

  const { user } = useAuthenticator((context) => [context.user]);

	const chartRef = useRef(undefined);

	function onClick() {
		toPng(chartRef.current).then(function (dataUrl) {
			download(dataUrl, 'my-node.png');
		});
	}

	return (
		<VStack spacing={8} align='stretch' w='100%'>
			{!hideTitle && <Text fontWeight='600' textAlign='center'>{measureData?.title}</Text>}

			{/*<Text textAlign='left' fontSize='13px' fontWeight='500'>{measureData?.description}</Text>*/}
			{	isAdminUser(user?.username) && <Button onClick={onClick}>Download Chart</Button> }
 			<GroupsDeck groups={groupData} />

			<Box ref={chartRef} h='100%'>
				<OutcomeDataChart 
				{...{
					unit: measureData?.units,
					borderRadius: 4,
					outcomes: measureData?.outcomes, 
					groups: groupData}} /> 
			</Box>

			{measureData?.analytics?.length && <PowerHeatMap
				outcomeData={measureData?.outcomes}
				groupData={groupData}
				analyticsData={measureData?.analytics || []}/>
			}

		</VStack>
	);
}