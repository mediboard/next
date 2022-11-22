import {
	Text,
	Flex
} from '@chakra-ui/react';
import Tile from './Tile';
import TreatmentSummary from './TreatmentSummary';


export default function TreatmentCard(props) {
	const { treatment, conditionGroup, ...kv } = props;

	return (
		<Tile bg='white' {...kv}>
			<TreatmentSummary
				w='fit-content'
				conditionGroup={conditionGroup}
				treatment={treatment} />
		</Tile>
	)
}