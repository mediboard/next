import Image from 'next/image';
import {
	Flex,
	Heading,
	Text,
} from '@chakra-ui/react';

export default function Title() {
	return (
		<Flex alignItems='center' justifyContent='center' w='100%'>
			<Flex flexDirection='column' alignItems='center'>
				<Image src='/MediboardFullText.png' width={750} height={120}/>
				<Heading mt={10} fontSize={['32px', '56px']}>{'The Medical Board'}</Heading>
				<Text color='#595959'>{"Structuring the world's medical knowledge"}</Text>
			</Flex>
		</Flex>
	);
}