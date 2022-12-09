import {
	Flex,
	Spacer,
	HStack,
	Skeleton,
	VStack,
	Link,
	LinkOverlay,
	Button,
	LinkBox,
	Box,
	Square,
	Text
} from '@chakra-ui/react'


export function PageButton(props) {
	const { children, color, bg, onClick, ...kv } = props;

	return (
		<Box pl={1} pr={1} {...kv}>
			<Square h='100%' w='100%' bg={bg || 'black'} onClick={onClick}>
				<Text color={color || 'white'}>{children}</Text>
			</Square>
		</Box>
	);
}

export default function PageDeck(props) {
	const { children, no_pages, page_no, onPageClick, ...kv } = props;

	let arrOne = children.filter((x,i) => i % 2 === 0);
	let arrTwo = children.filter((x,i) => i % 2 != 0);

	// const zip = (a, b) => array.from(array(math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);
	// let zipped = zip(arrone, arrtwo);

	return (
		<Flex 
			direction='column'
			h='100%' w='100%'
			overflow='scroll' 
			{...kv}>
			<Flex w='100%' gap={[5, 2]} flexDirection={['column','row']}>
				<VStack w='100%' spacing={[5, 2]}>
				{arrOne.map(x => (x))}
				</VStack>

				<VStack w='100%' spacing={[5, 2]}>
				{arrTwo.map(x => (x))}
				</VStack>

				<HStack w='100%' alignItems='stretch'>
				<Button w='25%'>{'Previous'}</Button>

				<Flex w='50%' alignItems='stretch'>
				{[... new Array(no_pages).keys()].slice((page_no-1), page_no + 4)?.map((x, i) => {
					if (i === 3 && no_pages >= 5) {
						return (
							<PageButton key={x+'-page-button'} onClick={onPageClick} w={`${100/5}%`}>{'...'}</PageButton>
						);
					}

					if (i === 4 && no_pages >= 5) {
						return (
							<PageButton key={x+'-page-button'} onClick={() => onPageClick(no_pages)} w={`${100/5}%`}>{no_pages}</PageButton>
						);
					}

					return (
						<PageButton key={x+'-page-button'} onClick={() => onPageClick(x+1)} w={`${100/5}%`}>{x + 1}</PageButton>
					);
				})}
				</Flex>

				<Button w='25%'>{'Next'}</Button>
				</HStack>

			</Flex>
		</Flex>
	);
}