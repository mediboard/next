import { useRef } from 'react';
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
import { parseMeasureType } from '../utils';
import { toPng } from 'html-to-image';
import download from 'downloadjs';


export default function Measure(props) {
	const { measureData, groupData, ...kv } = props;
  const { user } = useAuthenticator((context) => [context.user]);

	const chartRef = useRef(undefined);

	function onClick() {
		toPng(chartRef.current).then(function (dataUrl) {
			download(dataUrl, 'my-node.png');
		});
	}

	return (
		<VStack spacing={2} align='stretch' w='100%'>
			<Text textAlign='left'>{measureData?.title}</Text>
			<Text textAlign='left' fontSize='13px' fontWeight='500'>{measureData?.description}</Text>
			{	isAdminUser(user?.username) && <Button onClick={onClick}>Download Chart</Button> }
			<Box ref={chartRef} h='100%'>
				<OutcomeDataChart {...{
					unit: measureData?.units,
					border:'10px solid #CED4DB',
					borderRadius: 4,
					chartH: 250,
					outcomes: measureData?.outcomes, 
					groups: groupData}} /> 
			</Box>
 			<GroupsDeck groups={groupData} />
		</VStack>
	);
}