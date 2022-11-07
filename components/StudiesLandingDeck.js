import StudyCard from './StudyCard';
import {
	Flex,
} from '@chakra-ui/react';
import PageDeck from './PageDeck';



export default function StudiesLandingDeck(props) {
	const { studies, ...kv } = props;

	return (
		<Flex flexDirection='column'>
			<PageDeck p={0}>
			{studies?.map(x => (<StudyCard w={['100%', '100%']} key={x.id} {...x}/>))}
			</PageDeck>
		</Flex>
	)
}