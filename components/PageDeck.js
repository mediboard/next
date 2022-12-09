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
	Text,
	useBreakpointValue
} from '@chakra-ui/react'
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';


export function PageButton(props) {
	const { children, color, bg, fontWeight, borderColor, borderWidth, onClick, ...kv } = props;

	return (
		<Box pl={1} pr={1} {...kv}>
			<Square h='100%' w='100%' 
				bg={bg || 'clear'} borderRadius={4} 
				borderColor={borderColor}
				borderWidth={borderWidth}
				onClick={onClick}>
				<Text fontSize={'14px'} fontWeight={fontWeight || '500'} color={color || 'black'}>{children}</Text>
			</Square>
		</Box>
	);
}

export default function PageDeck(props) {
	const { children, no_pages, page_no, onPageClick, ...kv } = props;

	const noButtons = useBreakpointValue({ base: 4, md:7, lg: 10 });

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
			</Flex>
			<HStack w='100%' mt={10} alignItems='stretch' spacing={1}>
				<Button variant={'outlined'}
					w={['20%', '10%']} 
					onClick={() => {if (page_no > 1) { onPageClick(page_no-1); }}}>{'Prev'}</Button>

				<Flex w={['60%', '80%']} alignItems='stretch'>
				{[... new Array(no_pages).keys()].slice((page_no-1), (page_no-1) + noButtons)?.map((x, i) => {
					if (i === (noButtons - 2) && no_pages >= noButtons) {
						return (
							<PageButton key={x+'-page-button'}
								onClick={onPageClick}
								w={`${100/noButtons}%`}>{'...'}</PageButton>
						);
					}

					if (i === (noButtons - 1) && no_pages >= noButtons) {
						return (
							<PageButton key={x+'-page-button'}
								onClick={() => onPageClick(no_pages)}
								w={`${100/noButtons}%`}>{no_pages}</PageButton>
						);
					}

					return (
						<PageButton key={x+'-page-button'}
							borderColor={page_no === x + 1 ? 'purple.400' : 'none'}
							borderWidth={page_no === x + 1 ? '1px' : '0px'}
							fontWeight={page_no === x + 1 ? '800' : '500'}
							onClick={() => onPageClick(x+1)}
							w={`${100/noButtons}%`}>{x + 1}</PageButton>
					);
				})}
				</Flex>

				<Button w={['20%', '10%']} m={0} onClick={() => {if(page_no < no_pages) { onPageClick(page_no+1)}}}>{'Next'}</Button>
			</HStack>
		</Flex>
	);
}