import {
	Flex,
	SimpleGrid,
	Box
} from '@chakra-ui/react';


export default function AnalyticsBubbleSummary(props) {
	const { score, ...kv } = props;

	const color = () => {
		if (score == null) { return null }

		if (score > 8) { return 'green.500'; }

		if (score > 1) { return 'orange.400'; }

		return 'red.600'
	}

	return (
		<SimpleGrid w='100%' columns={3} spacing={1}>
			<Box h={2} borderRadius={4} bg={score != null ? color() : 'grey'}/>
			<Box h={2} borderRadius={4} bg={score > 1 ? color() : 'grey'}/>
			<Box h={2} borderRadius={4} bg={score > 8 ? color() : 'grey'}/>
		</SimpleGrid>
	);
}