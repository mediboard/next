import { useRef } from 'react';
import {
	Heading,
	Spacer,
	Flex,
	Text,
	AspectRatio,
	Image,
	Box,
	Badge,
	Show,
	Hide,
	Link
} from '@chakra-ui/react';
import Tile from './Tile';
import { ItemBadge } from './TreatmentCompareItem';
import { ExpandableText } from './ExpandableText';
import ExpandableDeck from './ExpandableDeck';
import { EffectsSummary } from './StudyCard';


export default function StudyVCard(props) {
	const {
		id,
		short_title,
		responsible_party,
		sponsor,
		description,
		upload_date,
		conditions,
		treatments,
		effects,
		noUpvotes,
		resultsSummary,
		_version,
		...kv
	} = props;

	const expandRef = useRef(null);

	return (
		<Tile {...kv} textAlign='left' p={0} >
			<AspectRatio ratio={1.8} w={'100%'}>
				<Image src={`https://treats-public-resources.s3.us-west-2.amazonaws.com/${id}/thumbnail.png`}
					objectFit='fill !important'/>
			</AspectRatio>

			<Flex flexDirection='column' gap={1} p={3} w={'100%'} h='100%'>
				<ExpandableText
					display='flex' 
					justifyContent='center'
					flexDirection='column'
					noOfLines={2} 
					ref={expandRef}>
					<Heading fontSize='16px'>{short_title}</Heading>
				</ExpandableText>

				<ExpandableDeck columnGap={2} rowGap={1}>
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
							textAlign='center'>{x.name}</ItemBadge>
					))}
				</ExpandableDeck>
				
				<Flex>
					<Box mt={2}>
						<EffectsSummary color='orange.700' no_effects={effects?.length}/>
					</Box>
				</Flex>

				<Flex alignItems='center'>
					<Link
						textDecoration='underline'
						color='purple.300'
						href={`/studies/${id}/${short_title.toLowerCase().replaceAll(' ', '_')}`}>
					{'see full study'}
					</Link>

					<Spacer />

					<Box bg='orange.200' borderRadius={4} pl={1} pr={1}>
						<Text fontSize='13px' color='orange.600'>{'Summarized'}</Text>
					</Box>
				</Flex>
			</Flex>
		</Tile>
	)
}