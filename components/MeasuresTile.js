import { Text } from '@chakra-ui/react';
import Tile from './Tile';

export default function MeasuresTile(props) {
	const { measure, onClick, ...kv } = props;

	return (
		<Tile w='100%' onClick={onClick} {...kv}>
			<Text align='left' fontWeight='500' fontSize='14px'>{measure?.title}</Text>
		</Tile>
	);
}