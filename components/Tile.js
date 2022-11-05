import {
	Flex
} from '@chakra-ui/react';


export default function Tile(props) {
	const { children, ...kv } = props;

	return (
		<Flex 
			border='1px solid #cccccc'
			boxShadow='md'
			borderRadius={4}
			p={3}
			flexDirection='column' {...kv}>
			{children}
		</Flex>
	);
}