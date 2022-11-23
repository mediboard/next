import { useRouter } from 'next/router';
import {
	Text,
	Flex
} from '@chakra-ui/react';
import Tile from './Tile';
import TreatmentSummary from './TreatmentSummary';


export default function TreatmentCard(props) {
	const { treatment, conditionGroup, ...kv } = props;

	const router = useRouter();

	const isSelected = () => {
		return router.query?.treatments?.includes(treatment?.name);
	}

	function onClick(e) {
		if (isSelected()) {
			router.query.treatments = router.query.treatments.split(',').filter(x => x !== treatment?.name).join(',');
			router.push(router, undefined, { shallow: true });
			return;
		}

		let queryTreatments = [];
		if (router.query.treatments) {
			queryTreatments = router.query.treatments.split(',');
		}
		queryTreatments.push(treatment?.name);

		let newTrets = queryTreatments.join();
		router.query.treatments = newTrets;

		router.push(router, undefined, { shallow: true })
	}

	return (
		<Tile bg='white' onClick={onClick} {...kv}>
			<TreatmentSummary
				w='fit-content'
				conditionGroup={conditionGroup}
				treatment={treatment} />
		</Tile>
	)
}