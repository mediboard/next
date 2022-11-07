import {
	SimpleGrid,
	Grid, 
	GridItem,
	Show,
	Hide,
	Flex,
	Box,
	Skeleton,
} from '@chakra-ui/react';
import StudyCard from './StudyCard';
import StudyVCard from './StudyVCard';


export default function FeaturedStudiesDeck(props) {
	const { studies, ...kv } = props;

	return (
		<>
		<Show above='sm'>
		<SimpleGrid spacing={3} columns={3} overflowX='scroll' w='100%'>
		{ studies?.slice(0, 3)?.map(x => (<StudyVCard key={x.id} {...x}/> )) }
		</SimpleGrid>
		</Show>

		<Hide above='sm'>
		<Flex overflowX='scroll' pl={6} pr={6} gap={3}>
		{ studies?.slice(0,3)?.map((x,i) => (<StudyVCard key={x.id} {...x} minW='75%'/> )) }
		</Flex>
		</Hide>
		</>
	);
}