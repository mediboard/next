import Image from 'next/image';
import {
	Box,
	Spacer,
	Flex,
	VStack,
	Text
} from '@chakra-ui/react';


export default function Team() {
	return (
		<Flex alignItems='center' justifyContent='center' w='100%'>
			<Image src='/TeamSlide.svg' width='1200' height='600' />
		</Flex>
	);

	// return (
	// 	<Flex alignItems='center' justifyContent='center' w='100%'>
	// 		<Flex flexDirection='column' position='relative' w='100%' h='100%'>
	// 			<Box position='absolute' top='0px' right='30%'>
	// 				<Image src='/TeamSkiing.png' width='552' height='763'/>
	// 			</Box>

	// 			<Flex>
	// 				<VStack>
	// 					<Text
	// 				</VStack>
	// 				<Spacer />

	// 				<VStack>
	// 				</VStack>
	// 			</Flex>
	// 		</Flex>
	// 	</Flex>
	// )
}