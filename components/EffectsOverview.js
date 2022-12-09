import {
	Flex,
	SimpleGrid,
} from '@chakra-ui/react';
import { ItemBadge } from './TreatmentCompareItem';
import AttributeSummaryCard from './AttributeSummaryCard';
import StudySection from './StudySection';


function distinctEffects(effectGroups) {
	return [...new Set(effectGroups.map(x => x.effects.map(y => y.name)).flat())];
}

export default function EffectsOverview(props) {
	const { effectsGroups, studyId, ...kv } = props;

	return (
		<StudySection header='Adverse Effects'>
		<Flex flexDirection={['column', 'row']} gap={[6, 0]}>
		<SimpleGrid rows={[4,2]} columns={[1,2]} spacingY='20px' spacingX='20px' w={['100%', '60%']}>
				<AttributeSummaryCard
					shallow={true}
					href={`/studies/${studyId}/?section=adverse effects`}
					w='100%' color='orange.700' text='Adverse Effects'>
					{distinctEffects(effectsGroups)?.length}
				</AttributeSummaryCard>

				<AttributeSummaryCard 
					shallow={true}
					href={`/studies/${studyId}/?section=adverse effects`}
					w='100%' color='purple.300' text='Full Distribution'>
					{'Available'}
				</AttributeSummaryCard>

				<AttributeSummaryCard 
					shallow={true}
					href={`/studies/${studyId}/?section=adverse effects`}
					w='100%' color='orange.700' text='Serious Effects'>
					{'Unavailable'}
				</AttributeSummaryCard>

				<AttributeSummaryCard
					shallow={true}
					href={`/studies/${studyId}/?section=adverse effects`}
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
					alignItems='center'
					textAlign='center'>{effect}</ItemBadge>
			))}
			{distinctEffects(effectsGroups)?.length > 5 && <ItemBadge
				color='#CED4DB' 
				w='fit-content'
				alignItems='center'
				textAlign='center'>{`+ ${distinctEffects(effectsGroups)?.length - 5} more`}</ItemBadge>}
		</Flex>
		</Flex>
		</StudySection>
	);
}