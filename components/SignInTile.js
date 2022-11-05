import { useContext } from 'react';
import { 
	Text,
	Button,
	Box,
	Flex
} from '@chakra-ui/react';
import Tile from './Tile';
import { SignInContext } from '../App';


export default function SignInTile(props) {
	const { children, ...kv } = props;

	const signInContext = useContext(SignInContext);

	function onClick() {
		signInContext({'type': 'SignIn'})
	}

	return (
		<Tile bg='white' {...kv}>
			<Flex flexDirection='column' gap={4}>
				<Text>{children}</Text>
				<Box>
					<Button onClick={onClick}>{'Sign In'}</Button>
				</Box>
			</Flex>
		</Tile>
	)
}