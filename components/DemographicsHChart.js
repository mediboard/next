import {
	Flex,
	Text,
	Spacer,
	Box
} from '@chakra-ui/react';
import Tile from './Tile';
import DemographicsChart from './charts/DemographicsChart';


const demoIsRace = {
	'White': true,
	'Black': true,
	'Asian': true,
	'Indian': true,
	'Pacific': true
};

const demoIsGender = {
	'Male': true,
	'Female': true
};

let colorWheel = [
  "#374DC8",
  "#002779",
  "#82ca9d",
  "#E7DAF7",
  "#767BFF",
];

export default function DemographicsHChart(props) {
	const {
		isLoading,
		demos,
		title,
		aspect,
		...kv
	} = props;

	const raceChartProps = (demos) => ({
		name: 'RACE',
		fill: "#82ca9d",
		aspect: aspect || 1.7,
		colorWheel: colorWheel,
		data: demos.filter(data => demoIsRace[data.sub_type] || false)
	});

	const genderChartProps = (demos) => ({
		name: 'GENDER',
		fill: "var(--chakra-colors-purple-300)",
		aspect: aspect || 1.7,
		colorWheel: ["#E7DAF7", "#374DC8"],
		data: demos.filter(data => demoIsGender[data.sub_type] || false)
	});

	return (
		<Tile flexDirection='column' w='100%' rowGap={3} pb={3} {...kv}>
			<Text>{title}</Text>
			<Flex direction='row' w='92%' mr='4%' ml='4%'>
				<Box h='fitContent' w='45%'>
					<DemographicsChart key='raceOne' {...raceChartProps(demos)} />
				</Box>
				<Spacer />
				<Box h='fitContent' w='45%'>
					<DemographicsChart key='gender' {...genderChartProps(demos)} />
				</Box>
			</Flex>
		</Tile>
	);
}