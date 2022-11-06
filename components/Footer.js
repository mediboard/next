import {
	Flex,
	Text,
	HStack,
	Heading,
	Spacer,
	Hide
} from '@chakra-ui/react';


function FooterButton({
	text
}) {

	return (
		<Text 
			id={text}
			fontSize={'12px'}
			_hover={{cursor: 'pointer'}}
			color={'white'}>
		{text}
		</Text>
	);
}

export default function Footer() {
	return (
		<Flex bg='#1E1E1E' w='100%' p={4}>
			<Hide below='md'>
			<Heading 
				color='white' 
				position='absolute'
				size='md'
				ml={10}
				w={140} 
				textAlign='left'>
			THE MEDICAL BOARD
			</Heading>
			<Spacer />

			<HStack spacing={10} h={'45px'}>
				<FooterButton 
					text='HOME' />
				<FooterButton 
					text='CONDITIONS' />
				<FooterButton 
					text='TREATMENTS' />
				<FooterButton 
					text='STUDIES' />
				<FooterButton 
					text='FAQ' />
			</HStack>
			<Spacer />
			</Hide>
		</Flex>
	);
}