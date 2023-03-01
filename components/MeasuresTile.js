import { useState } from 'react';
import { 
	Box,
	Flex,
	Text,
	Center,
	Collapse,
	Spacer
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Tile from './Tile';
import MeasureDataWrapper from './MeasureDataWrapper';


const type2Color = {
	'measure_type.PRIMARY': 'purple.300',
	'measure_type.SECONDARY': 'green.300',
	'measure_type.OTHER': 'orange.300'
}

export default function MeasuresTile(props) {
	const { measure, onClick, variant, ...kv } = props;
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<Tile 
			flexDirection='column'
			p={0}
			w='100%'
			{...kv}>
			<Flex w='100%' onClick={variant==='expandable' ? ()=>{setIsExpanded(!isExpanded)} : onClick}>
				<Box minW={5} borderRadius='4px 0px 0px 4px' bg={type2Color[measure?.type]}/>
				<Box p={3}>
					<Text align='left' fontWeight='500' fontSize='14px'>{measure?.title}</Text>
				</Box>
				<Spacer />
				<Center display={onClick ? 'default' : 'none'}>
					<ChevronRightIcon w={5} h={7} />
				</Center>
			</Flex>

			<Collapse in={isExpanded} unmountOnExit>
				<MeasureDataWrapper measureId={measure?.id}/>
			</Collapse>
		</Tile>
	);
}