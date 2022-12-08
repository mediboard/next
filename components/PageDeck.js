import {
	Flex,
	Spacer,
	HStack,
	Skeleton,
	VStack,
	Box,
	Text
} from '@chakra-ui/react'


export default function PageDeck(props) {
	const { children, no_pages, onPageClick, ...kv } = props;

	let arrOne = children.filter((x,i) => i % 2 === 0);
	let arrTwo = children.filter((x,i) => i % 2 != 0);

	// const zip = (a, b) => array.from(array(math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);
	// let zipped = zip(arrone, arrtwo);

	return (
		<Flex 
			direction='column'
			h='100%'
			w='100%'
			overflow='scroll' 
			{...kv}>
			<Flex w='100%' gap={[5, 2]} flexDirection={['column','row']}>
				<VStack w='100%' spacing={[5, 2]}>
				{arrOne.map(x => (x))}
				</VStack>

				<VStack w='100%' spacing={[5, 2]}>
				{arrTwo.map(x => (x))}
				</VStack>
			</Flex>
		</Flex>
	);
}