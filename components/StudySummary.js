import {
	Flex,
	Box,
	Heading,
	Text,
	LinkOverlay,
	Spacer,
	Link
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { ItemBadge } from './TreatmentCompareItem';
import ExpandableDeck from './ExpandableDeck';
import StudyUpvote from './StudyUpvote';
import AnalyticsBubbleSummary from './AnalyticsBubbleSummary';


export function EffectsSummary(props) {
	const { no_effects, color, ...kv } = props;

	return (
		<Flex
			gap={2}
			borderRadius={4}
			boxShadow='0px 0px 2px 2px rgba(0, 0, 0, 0.1)'
			p={1}
			pl={2}
			w='fit-content'
			alignItems='center'>
			<Text fontSize={['14px','16px']}>{'Adverse Effects: '}</Text>
			<Flex justifyContent='center' bg='white' p={1} pr={0} borderRadius={4} alignItems='center'>
				<Text fontSize={['18px','22px']} fontWeight='550' color={color}>{no_effects}</Text>
			</Flex>
			<ChevronRightIcon color='#888888' w={6} h={7}/>
		</Flex>
	)
}

export default function StudySummary(props) {
	const {
		id,
		short_title,
		responsible_party,
		sponsor,
		description,
		upload_date,
		conditions,
		treatments,
		noUpvotes,
		effects,
		results_summary,
		showAnalytics,
		headingSx,
		_version,
		showParty,
		clickable,
		...kv
	} = props;

	return (
		<Flex flexDirection='column' textAlign='left' {...kv}>
			<Link href={`/studies/${id}/${short_title?.toLowerCase()?.replaceAll(' ', '_')}`}>
				<Heading _hover={{textDecoration: 'underline'}}
					fontSize='16px'
					noOfLines={3}
					{...headingSx}>
					{short_title}
				</Heading>
			</Link>

			{showParty && <Flex w='100%' mb={2} >
				<Text fontSize='14px' fontWeight='400'>{
					sponsor + (responsible_party != 'NA' ? ' - ' + responsible_party : '')}</Text>
				<Spacer />
				<Text fontSize='14px' fontWeight='400'>{upload_date?.split('00:')?.[0]}</Text>
			</Flex>}
			
			<ExpandableDeck
				columnGap={2}
				rowGap={1}
				mt={2}
				mb={2}>
				{conditions?.map(x => (
					<ItemBadge 
						color='purpleHover.100' 
						w='fit-content'
						textAlign='center'>{x.name}</ItemBadge>
				))}
			</ExpandableDeck>

			<ExpandableDeck columnGap={2} rowGap={1}>
				{treatments?.map(x => (
					<ItemBadge 
						color='purpleHover.500' 
						w='fit-content'
						pl={2}
						pr={2}
						textAlign='center'>{x.name}</ItemBadge>
				))}
			</ExpandableDeck>

			<Flex>
				<Box mt={3} display={showAnalytics ? 'default' : 'none'}>
					<EffectsSummary color='orange.700' no_effects={effects?.length}/>
				</Box>
			</Flex>

			<Spacer />
			<Flex w='100%' alignItems='center' mt={3}>
				<StudyUpvote studyId={id} studyUpvotes={noUpvotes} _version={_version}/>
				<Spacer />

				<Text fontWeight='500' mr={2}>{'Result Strength: '}</Text>
				<Box w='20%'>
					<AnalyticsBubbleSummary score={results_summary}/>
				</Box>
			</Flex>
		</Flex>
	)
}