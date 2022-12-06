import { 
	Box,
	Text,
	Center
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Tile from './Tile';


const type2Color = {
	'measure_type.PRIMARY': 'purple.300',
	'measure_type.SECONDARY': 'green.300',
	'measure_type.OTHER': 'orange.300'
}

export default function MeasuresTile(props) {
	const { measure, onClick, ...kv } = props;

	return (
		<Tile 
			flexDirection='row'
			p={0}
			w='100%'
			onClick={onClick}
			{...kv}>
			<Box minW={5} borderRadius='4px 0px 0px 4px' bg={type2Color[measure?.type]}/>
			<Box p={3}>
				<Text align='left' fontWeight='500' fontSize='14px'>{measure?.title}</Text>
			</Box>

			<Center>
				<ChevronRightIcon w={5} h={7} />
			</Center>
		</Tile>
	);
}