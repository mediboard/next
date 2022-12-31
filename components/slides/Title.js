import Image from 'next/image';
import {
	Flex,
	Heading,
	Text,
} from '@chakra-ui/react';

export default function Title() {
	return (
		<Flex alignItems='center' justifyContent='center' w='100%'>
			<Flex flexDirection='column'>
				<Image />
				<Heading>{'The Medical Board'}</Heading>
				<Text>{"Structuring the world's medical knowledge"}</Text>
			</Flex>
		</Flex>
	);
}