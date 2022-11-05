import {
	Flex,
	Spacer,
	HStack,
	Skeleton,
	VStack,
	Box,
	Text
} from '@chakra-ui/react'


export default function LoadMoreDeck(props) {
	const { children, isLoading, onLoadMore, showLoadMore, ...kv } = props;

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
			<Flex w='100%' gap={2} flexDirection={['column','row']}>
				<VStack w='100%'>
				{isLoading ? [...new Array(5)].map(x => (<Skeleton h={60} w='100%' />)) : 
					arrOne.map(x => (x))}
				</VStack>

				<VStack w='100%'>
				{isLoading ? [...new Array(5)].map(x => (<Skeleton h={60} w='100%' />)) : 
					arrTwo.map(x => (x))}
				</VStack>
			</Flex>

			<Box w='100%'>
				<Text 
					display={showLoadMore ? 'default' : 'none'}
					onClick={onLoadMore}
					_hover={{
						cursor: 'pointer',
						textDecoration: 'underline'
					}}
					color='purple.300' 
					float='right'>{'show more'}</Text>
			</Box>
		</Flex>
	);
}