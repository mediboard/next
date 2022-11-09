import { 
	useState,
	useContext
} from 'react';
import {
	Box,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
	Text
} from '@chakra-ui/react';
import { Auth } from 'aws-amplify';
import { SignInContext } from '../pages/_app';


export default function EmailVerification({email}) {
	const body = 'An email has been sent - please verify yourself\
	by entering the verification code in the email';
	const [error, setError] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const signInContext = useContext(SignInContext);

	async function confirmSignUp() {
		setIsLoading(true);
		Auth.confirmSignUp(email, document.getElementById("verify")?.value).then(() => {
			signInContext({type: 'SignIn'});
		}).catch(error => {
			setError(error.message);
		}).finally(() => {
			setIsLoading(false);
		});
	}

	return (
		<Box w='100%' textAlign='center'>
			<Text>{body}</Text>
			<FormControl isInvalid={error}>
				<FormErrorMessage>{error}</FormErrorMessage>
				<FormLabel htmlFor='verify'>Verification Code</FormLabel>
				<Input mb={4} id='verify' type='verify' />
			</FormControl>

			<Box w='100%'>
				<Button
					isLoading={isLoading}
					onClick={confirmSignUp}
					loadingText='Registering'
					float='right'>Verify</Button>
			</Box>
		</Box>
	);
}