import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
	VStack,
	Text,
	Box
} from '@chakra-ui/react';
import MeasuresTile from './MeasuresTile';


export default function MeasuresSideDeck(props) {
	const { setSelectedMeasure, selectedMeasure, measures, ...kv } = props;

  const router = useRouter();
  const { title, id, section, result } = router.query;

	useEffect(() => {
		if (result && measures?.length) {
			setSelectedMeasure(measures?.filter(measure => measure.id == result)[0]);
		}
	}, [result, measures?.length])

	function selectMeasure(measureId) {
		router.query.result = measureId;
		router.push(router, undefined, { shallow: true });
	}

	return (
		<VStack w='100%' maxH={['500px', '800px']} overflow='scroll' align='stretch'>
			<Text textAlign='left'>{'Measures: '}</Text>
		{measures.map(measure => (
			<MeasuresTile key={measure.id} 
				measure={measure}
				_hover={{
					cursor: 'pointer'
				}}
				bg={selectedMeasure?.id === measure.id ? '#cccccc44' : 'white'}
				border={selectedMeasure?.id === measure.id ? '2px solid rgb(129, 133, 255)' : 'default'} 
				onClick={() => selectMeasure(measure.id)} />
		))}
		</VStack>
	);
}