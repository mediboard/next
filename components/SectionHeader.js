import {
	Text,
	Heading,
	Flex,
	Box
} from '@chakra-ui/react';


export default function SectionHeader(props) {
	const { title, innerSx, ...kv } = props;

	return (
		<Flex  justifyContent={['center', 'left']} pt={6} {...kv}>
			<Box bg='#cccccc99' p={4} borderRadius={10} {...innerSx}>
				<Heading fontSize='16px'>{title}</Heading>
			</Box>
		</Flex>
	);
}