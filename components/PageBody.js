import {
	Flex
} from '@chakra-ui/react';


export default function PageBody(props) {
	const { children, ...kv } = props;
	return (
		<Flex 
			mt='10px'
			minH='85vh'
			align='top'
			{...kv}>
		{children}
		</Flex>
	);
}