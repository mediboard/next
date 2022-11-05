import {
	Box,
	Text,
	Flex
} from '@chakra-ui/react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import SignInTile from '../board/SignInTile';


export default function SignInBlocker(props) {
	const { children, text, ...kv } = props;
	const { user } = useAuthenticator((context) => [context.user]);

	return (
		<Box position='relative'>
			{children}
			<Box
				display={user ? 'none' : 'default'}
				w='100%' 
				zIndex={2}
				h={'100%'} 
				position='absolute' 
				bg='#cccccc88'
				backdropFilter='blur(20px)'
				style={{
					'-webkit-filter': 'blur(5px)'
				}}
				top='0px'/>
			<Flex
				w='100%'
				display={user ? 'none' : 'flex'}
				position='absolute'
				h='100%'
				zIndex={2}
				justifyContent='center'
				alignItems='center'
				top='0px'>
				<SignInTile>{text}</SignInTile>
			</Flex>
		</Box>
	)
}