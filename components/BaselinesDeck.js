import VerticalTextCard from './VerticalTextCard';
import DemographicsChart from './charts/DemographicsChart';
import { 
	Box,
	Heading,
	Text,
	Flex,
	VStack } from '@chakra-ui/react';
import AttributeSummaryCard from './AttributeSummaryCard';
import BaselinesPage from './BaselinesPage';


function groupBaselinesByBase(data) {
	const baseToBaselines = {};

	data.forEach(baseline => {
		if (baseToBaselines[baseline.base] === undefined) {
			baseToBaselines[baseline.base] = [];
		}

		baseToBaselines[baseline.base].push(baseline);
	})

	return Object.keys(baseToBaselines).map(key => ({
		base: key,
		data: aggregateBaselinesByCategory(baseToBaselines[key])
	}));
}

function getMaxNoParticipantsFromBaselines(baselines) {
	return Math.max(...baselines.map(kv => kv['data'].map(kv2 => kv2['value']).reduce((a,b) => a+b)));
}

// Baseline involving race with most participants
function getRaceBaselines(baselines) {
	let raceBaslines = baselines.filter(kv => kv['base'].toLowerCase().includes('race'));
	if (raceBaslines.length === 0) {
		return [];
	}

	return raceBaslines.reduce(function(a,b) {
		return a['data'].map(v => v.value).reduce((a,b) => a+b) > 
			b['data'].map(v => v.value).reduce((a,b) => a+b) ? a : b;
	});
}

// Baseline involving gender with most participants
function getGenderBaselines(baselines) {
	let raceBaslines = baselines.filter(kv => kv['base'].toLowerCase().includes('sex'));
	if (raceBaslines.length === 0) {
		return [];
	}
	
	return raceBaslines.reduce(function(a,b) {
		return a['data'].map(v => v.value).reduce((a,b) => a+b) > 
			b['data'].map(v => v.value).reduce((a,b) => a+b) ? a : b;
	});
}

// This also uses class if category is NA
function aggregateBaselinesByCategory(baseData) {
	const catOrClass = (baseline) => {
		return baseline.category === 'NA' ? baseline.class : baseline.category;
	}

	const categoryToData = {};

	baseData.forEach(baseline => {
		if (categoryToData[catOrClass(baseline)] === undefined) {
			categoryToData[catOrClass(baseline)] = [];
		}

		categoryToData[catOrClass(baseline)].push(baseline);
	})

	return Object.keys(categoryToData).map((key,index) => ({
		sub_type: key,
		value: categoryToData[key].map(x => x.value).reduce((a,b) => a+b)
	}));
}

let colorWheel = [
  "#374DC8",
  "#002779",
  "#82ca9d",
  "#E7DAF7",
  "#767BFF",
];

export default function BaselinesDeck(props) {
	const { studyId, title, fullPage, baselines, ...kv } = props;

	if (fullPage) {
		return <BaselinesPage studyId={studyId} baselines={baselines} />
	}

	return (
		<VStack>
			<Flex w='100%'
				flexWrap='wrap'
				loading={baselinesIsLoading}
				alignItems='center'
				justifyContent='center'>
				<Flex w={['70%', '31%']} mb={[4, 0]} h='100%' justifyContent='center' alignItems='center'>
					<VerticalTextCard
						isLoading={baselinesIsLoading}
						header={getMaxNoParticipantsFromBaselines(baselines)}
						subHeader={'TOTAL STUDY PARTICIPANTS'}
						color={'purple'} />
				</Flex>
				<Box w={['70%', '31%']}>
					<DemographicsChart 
						name={'GENDER'}
						colorWheel={colorWheel}
						fill="#82ca9d"
						aspect={1.3}
						data={getGenderBaselines(baselines)?.data}
					/>
				</Box>
{/*				<Box w={['70%', '31%']}>
					<DemographicsChart 
						name={'RACE'}
						colorWheel={colorWheel}
						fill={'var(--chakra-colors-purple-300)'}
						aspect={1.5}
						data={getRaceBaselines(baselines)?.data}
					/>
				</Box>
*/}			
				<Flex flexDirection='column' gap={4} justifyContent='center'>	
					<AttributeSummaryCard
						href={`/medical/studies/${studyId}/${title}/participants`}
						text={'Demographic Measures: '}
						color='purple.300'>{baselines?.length}
					</AttributeSummaryCard>
					<AttributeSummaryCard 
						href={`/medical/studies/${studyId}/${title}/participants`}
						text={'Racial Data: '}
						color='purple.300'>{getRaceBaselines(baselines)?.data ? 'Available' : 'No'}
					</AttributeSummaryCard>
				</Flex>	
			</Flex>
		</VStack>
	);
}
