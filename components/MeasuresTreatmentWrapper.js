import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MeasureMultiSelect from './MeasureMultiSelect';
import { Text } from '@chakra-ui/react';


export default function MeasuresTreatmentWrapper(props) {
	const { 
		treatmentName,
		groupName,
		conditionId,
		measures,
		setMeasures,
		...kv } = props;

	const router = useRouter();

	const queryParam = () => { return `${groupName}_${treatmentName}`; };

	function updateMeasures(newMeasures) {
		router.query[queryParam()] = newMeasures?.map(x => x.id)?.join(',');
		router.push(router, undefined, { shallow: true });

		setMeasures(newMeasures);
	}

	return (
		<>
		<Text>{treatmentName}</Text>
    <MeasureMultiSelect
      measures={measures || []}
      setMeasures={updateMeasures}
      conditionId={conditionId}
      treatmentName={treatmentName}
      initialIds={router.query[queryParam()]?.split(',')} />
    </>
	);
}