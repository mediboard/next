import {
	Flex,
	Skeleton
} from '@chakra-ui/react';


export default function Tile(props) {
	const { children, ...kv } = props;

	return (
		<Skeleton
			display='flex'
			boxShadow='0 0 8px #eee, 1px 0 3px #0000002a, -1px 0 3px #0000002a'
			borderRadius={4}
			m={1}
			p={3}
			isLoaded={true}
			flexDirection='column' {...kv}>
			{children}
		</Skeleton>
	);
}