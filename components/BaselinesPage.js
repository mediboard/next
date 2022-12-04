import {
	Flex,
	Box,
	Text,
	VStack,
	Divider
} from '@chakra-ui/react';
import DemographicsChart from './charts/DemographicsChart';
import InsightsDeck from './InsightsDeck';


function reduceBaselines(baselines) {
	if (!baselines['data']?.length) {
		return [];
	}

	return baselines['data'].reduce(function(a,b) {
		return a.map(v => v.value).reduce((a,b) => a+b) > 
			b.map(v => v.value).reduce((a,b) => a+b) ? a : b;
	});
}

let colorWheel = [
  "#374DC8",
  "#002779",
  "#82ca9d",
  "#E7DAF7",
  "#767BFF",
];

export default function BaselinesPage(props) {
	const { baselines, studyId, ...kv } = props;

	return (
		<VStack w='100%' spacing={5}>
			<Box w='100%'>
				<InsightsDeck study_id={studyId} type={'BASELINE'} />
			</Box>
			<Divider bg='#cccccc' h={'1px'} mt={1} mb={1}/>
			
			<Box w='100%'>
				<Flex flexWrap='wrap' w='100%' rowGap={4} justifyContent='center'>
				{baselines?.map(x => (
					<Box w={['90%','40%']} key={x?.base}>
						<Text  fontWeight='500'>{x?.base}</Text>
						<DemographicsChart 
							name={'GENDER'}
							colorWheel={colorWheel}
							fill="#82ca9d"
							aspect={1}
							data={x?.data || []} />
					</Box>
				))}
				</Flex>
			</Box>
		</VStack>
	);
}