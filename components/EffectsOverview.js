import {
	Flex,
	SimpleGrid,
} from '@chakra-ui/react';
import { ItemBadge } from './TreatmentCompareItem';
import AttributeSummaryCard from './AttributeSummaryCard';


function distinctEffects(effectGroups) {
	return [...new Set(effectGroups.map(x => x.effects.map(y => y.name)).flat())];
}

export default function EffectsOverview(props) {
	const { effectsGroups, studyId, title, ...kv } = props;

	return (
		<Flex flexDirection={['column', 'row']} gap={[4, 0]}>
		<SimpleGrid rows={[4,2]} columns={[1,2]} spacingY='20px' spacingX='20px' w={['100%', '60%']}>
				<AttributeSummaryCard 
					href={`/medical/studies/${studyId}/${title}/adverse effects`}
					w='100%' color='orange.700' text='Adverse Effects'>
					{distinctEffects(effectsGroups)?.length}
				</AttributeSummaryCard>

				<AttributeSummaryCard 
					href={`/medical/studies/${studyId}/${title}/adverse effects`}
					w='100%' color='purple.300' text='Full Distribution'>
					{'Available'}
				</AttributeSummaryCard>

				<AttributeSummaryCard 
					href={`/medical/studies/${studyId}/${title}/adverse effects`}
					w='100%' color='orange.700' text='Serious Effects'>
					{'Unavailable'}
				</AttributeSummaryCard>

				<AttributeSummaryCard
					href={`/medical/studies/${studyId}/${title}/adverse effects`}
					w='100%' color='purple.300' text='Treatments Tested'>
					{effectsGroups?.length}
				</AttributeSummaryCard>
		</SimpleGrid>

		<Flex flexWrap='wrap' gap={2} w={['100%','40%']} justifyContent='center'>
			{[...distinctEffects(effectsGroups)]?.slice(0,5)?.map(effect => (
				<ItemBadge 
					key={effect + '-bage'}
					color='purpleHover.300' 
					w='fit-content'
					textAlign='center'>{effect}</ItemBadge>
			))}
		</Flex>
		</Flex>
	);
}