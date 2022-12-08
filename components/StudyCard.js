import {
	Flex,
	Text,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Tile from './Tile';
import StudySummary from './StudySummary';


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
			<Text fontSize={['14px','16px']} fontWeight='500'>{'Adverse Effects: '}</Text>
			<Flex justifyContent='center' bg='white' p={1} pr={0} borderRadius={4} alignItems='center'>
				<Text fontSize={['18px','22px']} fontWeight='550' color={color}>{no_effects}</Text>
			</Flex>
			<ChevronRightIcon color='#888888' w={6} h={7}/>
		</Flex>
	)
}

export default function StudyCard(props) {
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
		_version,
		...kv
	} = props;

	return (
		<Tile border='1px solid #0000002a' {...kv} 
			textAlign='left'>
			<StudySummary {...props}/>
		</Tile>
	)
}