import {
	Flex,
	Text
} from '@chakra-ui/react';
import Tile from './Tile';
import PageBody from './PageBody';


export default function WaitlistPage(props) {
	const {children, ...kv} = props;

	return (
		<PageBody {...kv}>
			<Flex w='100%' alignItems='center' justifyContent='center'>
				<Tile bg='white' maxW='40%' textAlign='center'>
					{children}
				</Tile>
			</Flex>
		</PageBody>
	)
}