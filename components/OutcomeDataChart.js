import WhiskerPlot from './charts/WhiskerPlot';
import { 
	Box, 
	Show,
	Text,
	Flex,
	Spacer
} from '@chakra-ui/react';
import OutcomeBarChart from './charts/OutcomeBarChart';


function transformBandedData(outcome) {
	return {
		...outcome,
		group: outcome.group,
		min: Math.min(outcome.lower * 1.33, outcome.lower * .9),
		max: outcome.upper * 1.1,
		bottomBox: (outcome.adjusted_value || outcome.value) - (Math.abs((outcome.adjusted_value || outcome.value) - outcome.lower) * .33),
		topBox: (outcome.adjusted_value || outcome.value) + (Math.abs(outcome.upper - (outcome.adjusted_value || outcome.value)) * .33),
		bottomWhisker: outcome.lower,
		topWhisker: outcome.upper
	}
}

// Normalized means that IQR and CI are split in half
function transformDispersionData(outcome) {
	return {
		...outcome,
		group: outcome.group,
		min: (outcome.adjusted_value || outcome.value) - outcome.dispersion*3,
		max: (outcome.adjusted_value || outcome.value) + outcome.dispersion*3,
		bottomWhisker: (outcome.adjusted_value || outcome.value) - outcome.dispersion*2,
		bottomBox: (outcome.adjusted_value || outcome.value) - outcome.dispersion,
		topBox: (outcome.adjusted_value || outcome.value) + outcome.dispersion,
		topWhisker: (outcome.adjusted_value || outcome.value) + outcome.dispersion*2
	}
}

function normalizeData(outcome) {
	if (outcome.dispersion) {
		return transformDispersionData(outcome);
	}
	if (outcome.upper && outcome.lower) {
		return transformBandedData(outcome);
	}

	return outcome;
}

function addGroupProps(outcome, groups) {
	let group = groups.filter(x => x.id === outcome.group).pop();
	return {
		...outcome, 
		xAxis: outcome.title === 'NA' ? group?.title : outcome.title,
		groupName: group?.title,
		fill: group?.color
	};
}

function createGroupColorMapping(groups) {
	let id2Color = {};
	groups?.forEach(group => {
		id2Color[group.id] = group.color
	});

	return id2Color;
}

export default function OutcomeDataChart({
	outcomes,
	dispersion,
	unit,
	forceReload,
	groups,
	chartH,
	...kv
}) {
	const margin = {
		right: 30,
		left: 40,
		bottom: 30,
		top: 10
	}

	const config = { boxWidth: 100 }; // Box width needs to depend on the size and height of the element

	// If outcomes have no dispersion, do a basic bar chart
	

	return (
		<Box boxShadow='5px' w='100%' h='100%' {...kv}>
		{ (outcomes?.[0]?.dispersion || outcomes?.[0]?.upper) ?
			<WhiskerPlot
				type='box'
				height={chartH}
				forceReload={forceReload}
				unit={unit}
				colorMapping={createGroupColorMapping(groups)}
				grouped={ outcomes?.[0]?.title !== 'NA' }
				sumstat={ outcomes?.map(x => normalizeData(x)) }/> :
			<OutcomeBarChart
				colorMapping={createGroupColorMapping(groups)}
				unit={unit}
				groupings={ outcomes?.[0]?.title !== 'NA' ? groups?.map(group => ({name: group.title, fill: group.color})) : [{name: 'value'}]}
				data={outcomes?.map(x => normalizeData(x)) }/>
		}
		</Box>
	);
}