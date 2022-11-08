import { useContext } from 'react';
import {
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Textarea,
	Input,
	Text,
	IconButton,
	Heading,
	Flex,
	Spacer
} from '@chakra-ui/react';
import RegistrationBody from './RegistrationBody';
import { SignInContext } from '../pages/_app';
import { CloseIcon } from '@chakra-ui/icons';


export default function RegistrationModal({
	showDialog,
	type
}) {

	const signInContext = useContext(SignInContext);

	function onSubtextClick() {
		signInContext({
			type: type === 'NewUser' ? 'SignIn' : 'NewUser'
		});
	}

	return (
		<Modal
			size='2xl'
			isOpen={showDialog}>
	    <ModalOverlay />
	    <ModalContent>
		    <ModalHeader pb={2}>
		    	<Flex mb={1}>
		    		<Heading>{type === 'NewUser' ? 'Sign Up' : 'Sign In' }</Heading>
		    		<Spacer />
			    	<IconButton 
			    		colorScheme={'purple'}
			    		onClick={() => {signInContext(undefined)}}
			    		icon={<CloseIcon />}/>
		    	</Flex>
		    	<Flex w='100%'>
		    	<Text
		    		mb='2px'
		    		_hover={{
		    			cursor: 'pointer',
		    			borderBottom: '2px solid var(--chakra-colors-purple-300)',
		    			mb: '0px'
		    		}}
		    		onClick={onSubtextClick}
		    	>{type === 'SignIn' ? 'New User? Sign Up!': 
		    		'Existing User? Sign In!'}</Text>
		    	<Spacer />
		    	</Flex>
	    	</ModalHeader>
	    	<ModalBody h='100%'>
	    		<RegistrationBody type={type}/>
	    	</ModalBody>
	    </ModalContent>
		</Modal>
	);
}