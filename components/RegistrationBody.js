import { useState, useContext } from 'react';
import { 
	Box,
	Heading,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
	Hide
} from '@chakra-ui/react';
import { Auth } from 'aws-amplify';
import { SignInContext } from '../pages/_app';
import EmailVerification from './EmailVerification';


export default function RegistrationBody({type}) {
	const [signInError, setSignInError] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const signInContext = useContext(SignInContext);

	function onSubmit() {
		// Unfortunately there is a bug in amplify where
		// the authenticator component does not get sign in
		// events so we need to reload the page after sign in
		setIsLoading(true);
		if (type === 'NewUser') {
			return signUp();
		}

		return signIn();
	}

	async function signIn() {
		return Auth.signIn({
			username: document.getElementById("email")?.value,
			password: document.getElementById("password")?.value,
		}).then((response) => {
			signInContext(undefined);
			window.location.reload()
		}).catch((error) => {
			if (error.code === 'UserNotConfirmedException') {
				signInContext({
					type: 'Verify',
					body: {
						email: document.getElementById("email")?.value,
						username: document.getElementById("username")?.value,
					}
				});
			}
			setSignInError(error.message);
		}).finally(() => {
			setIsLoading(false);
		});
	}

	async function signUp() {
		return Auth.signUp({
			username: document.getElementById("email")?.value,
			password: document.getElementById("password")?.value,
			attributes: {
				preferred_username: document.getElementById("username")?.value
			}
		}).then((response) => {
			signInContext({
				type: 'Verify',
				body: {
					email: document.getElementById("email")?.value,
					username: document.getElementById("username")?.value,
				}
			});
		}).catch((error) => {
			setSignInError(error.message);
		}).finally(() => {
			setIsLoading(false);
		});
	}

	return (
		<Box>
			<FormControl isInvalid={signInError}>
				<FormErrorMessage>{signInError}</FormErrorMessage>
				<FormLabel htmlFor='email'>Email address</FormLabel>
				<Input mb={4} id='email' type='email' />

				<Box display={type === 'NewUser' ? 'default' : 'none'}>
				<FormLabel htmlFor='username'>Username</FormLabel>
				<Input mb={4} id='username' type='username' />
				</Box>

				<FormLabel htmlFor='password'>Password</FormLabel>
				<Input mb={4} id='password' type='password' />
			</FormControl>
			<Box w='100%'>
				<Button
					isLoading={isLoading}
					onClick={onSubmit}
					loadingText='Registering'
					float='right'>Let's go</Button>
			</Box>
		</Box>
	);
}