import { useState, useEffect } from 'react';
import {
	Flex,
	Spacer,
	Box,
	Text,
	VStack,
	Show,
	Hide,
	Skeleton
} from '@chakra-ui/react';
import EffectsBubbleChart from './charts/EffectsBubbleChart';
import { capitalizeEachWord } from '../utils';
import SectionHeader from './SectionHeader';


function EffectLegendItem({effect}) {
	return (
		<Flex border={`2px solid ${effect?.fill}`} pr={2} alignItems='center' borderRadius={15}>
			<Box h={5} w={5} mr={2} bg={effect?.fill} borderRadius='50%'/>
			<Text fontSize='14px'>{effect?.name}</Text>
		</Flex>
	);
}

function flattenData(effectsGroups) {
	const distinctEffects = new Set(effectsGroups.map(x => x.effects.map(y => y.name)).flat());

	return effectsGroups?.map((group, i) => {
		const effectsSet = new Set(group.effects.map(x => x.name));
		const disjointEffects = [...distinctEffects].filter(x => !effectsSet.has(x))

		return [
			...group.effects.map(effect => ({
				treatName: group.name,
				fill: group.fill,
				effectName: capitalizeEachWord(effect.name),
				noStudies: 4,
				freq: Math.round((effect.no_effected / effect.at_risk) * 1000) /10,
				key: effect.name + '-' + group.name
			})),
			...disjointEffects.map(effect => ({
				treatName: group.name,
				fill: group.fill,
				effectName: capitalizeEachWord(effect),
				noStudies: 0,
				freq: 0,
				key: effect + '-' + group.treatName
			}))
		];
	}).flat();
}

export default function EffectsComparisonStack(props) {
	const {
		effectsGroups,
		...kv }  = props;

	const [isExpanded, setIsExpanded] = useState(false);


	function onExpandClick() {
		setIsExpanded(!isExpanded);
	}

	return (
		<Flex flexDirection='column' gap={5} w='100%'>
			<Hide below='md'>
			<Flex w='100%' pl='20px' pr='50px' alignItems='center'>
				<Flex flexWrap='wrap' w='40%' gap={2}>
				{effectsGroups?.map(x => (
					<EffectLegendItem key={effectsGroups.name +'-legend'} effect={x}/>
				))}
				</Flex>
				<Text>{'Frequency of Side Effect'}</Text>
				<Spacer />
			</Flex>
			</Hide>

			<Show below='md'>
			<Flex w='100%' pl='20px' gap={2} pr='50px' alignItems='center' flexDirection='column'>
				<Flex>
					<Flex flexWrap='wrap' w='40%' gap={2}>
					{effectsGroups?.map(x => (
						<EffectLegendItem key={effectsGroups.name +'-legend'} effect={x}/>
					))}
					</Flex>
					<Spacer />
				</Flex>
				<Text>{'Frequency of Side Effect'}</Text>
			</Flex>
			</Show>

			<Flex justifyContent='center' w={'100%'} maxH={isExpanded ? '100%' : '650px'} overflow='hidden'>
				{effectsGroups.every(x=>x.effects)? <EffectsBubbleChart data={flattenData(effectsGroups)} 
						showStudies={false}
						groups={effectsGroups.map(x => ({treatName: x.name, fill: x.fill}))}
						margin={{left: 20, top: 20, right: 50, bottom: 20}}/> : <Spacer/>}
			</Flex>
			
			<Text fontSize='16px' 
				fontWeight='500'
				color='purple.300'
				_hover={{cursor: 'pointer'}}
				position='relative'
				onClick={onExpandClick}>{isExpanded ? 'Show less' : 'Show more'}</Text>
		</Flex>
	);
}
