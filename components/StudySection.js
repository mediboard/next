import {
	Flex,
	Box,
	Heading
} from '@chakra-ui/react'


export default function StudySection(props) {
	const { children, header, info, ...kv } = props;

	return (
		<Flex flexDirection='column'
			borderRadius={4} 
			bg='white' p={5}
			boxShadow='0 0 8px #eee, 1px 0 3px #0000001a, -1px 0 3px #0000001a'
			{...kv}>
			<Heading fontSize='18px' textAlign='left'>{header}</Heading>
			<Box pl={1} mt={header ? 5 : 0}>
			{children}
			</Box>
		</Flex>
	);
}