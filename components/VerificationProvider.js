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
import EmailVerification from './EmailVerification';
import { CloseIcon } from '@chakra-ui/icons';
import { SignInContext } from '../pages/_app';


export default function VerificationProvider({
	showDialog,
	email
}) {
	// The condition is if the user is verified and there are no
	// attributes for them
	const signInContext = useContext(SignInContext);

	return (
		<Modal
			size='2xl'
			isOpen={showDialog}>
	    <ModalOverlay />
	    <ModalContent>
		    <ModalHeader pb={2}>
		    	<Flex mb={1}>
		    		<Heading>Enter Verification Code</Heading>
		    		<Spacer />
			    	<IconButton 
			    		colorScheme={'purple'}
			    		onClick={() => {signInContext(undefined)}}
			    		icon={<CloseIcon />}/>
		    	</Flex>
	    	</ModalHeader>
	    	<ModalBody h='100%'>
					<EmailVerification email={email}/>
	    	</ModalBody>
	    </ModalContent>
		</Modal>
	);
}