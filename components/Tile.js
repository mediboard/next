import {
	Flex
} from '@chakra-ui/react';


export default function Tile(props) {
	const { children, ...kv } = props;

	return (
		<Flex 
			boxShadow='0 0 8px #eee, 1px 0 3px #0000002a, -1px 0 3px #0000002a'
			borderRadius={4}
			m={1}
			p={3}
			flexDirection='column' {...kv}>
			{children}
		</Flex>
	);
}