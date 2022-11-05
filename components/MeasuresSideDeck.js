import { useState, useEffect } from 'react';
import {
	VStack,
	Text,
	Box
} from '@chakra-ui/react';
import MeasuresTile from './MeasuresTile';
import studyHttpClient from '../../../services/clientapis/StudyHttpClient';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';


export default function MeasuresSideDeck(props) {
	const { study, setSelectedMeasure, selectedMeasure, ...kv } = props;

	const resultMatch = useRouteMatch('/medical/studies/:study/:title/results/:result_id');
	const resultPageMatch = useRouteMatch('/medical/studies/:study/:title/results');

	const history = useHistory();

	const [measures, setMeasures] = useState([]);
	const [measuresIsLoading, setMeasuresIsLoading] = useState(true);

	useEffect(() => {
		if (study?.id !== undefined && resultPageMatch?.params['study']) {
			loadMeasurementsData(study?.id);
		}
	}, [study?.id, resultPageMatch?.params['study']])

	useEffect(() => {
		let resultId = resultMatch?.params['result_id'];
		if (resultId && measures?.length) {
			setSelectedMeasure(measures?.filter(measure => measure.id == resultId)[0]);
		}
	}, [resultMatch?.params['result_id'], measures?.length])

	function selectMeasure(measureId) {
		let study_id = resultPageMatch?.params['study'];
		let title = resultPageMatch?.params['title'];

		let newPath = `/medical/studies/${study_id}/${title}/results/${measureId}`;
		history.push(newPath);
	}

	async function loadMeasurementsData(study_id) {
		setMeasuresIsLoading(true);
		studyHttpClient.getMeasures(study_id).then((data) => {
			setMeasures(data['measures']);

			if (!resultMatch?.params['result_id']) {
				selectMeasure(data['measures']?.[0]?.id);
			}
		}).catch((error) => {
			console.log('Error:' + error);
		}).finally(() => {
			setMeasuresIsLoading(false);
		})
	}

	return (
		<VStack w='100%' maxH={['500px', '800px']} overflow='scroll' align='stretch'>
			<Text textAlign='left'>{'Measures: '}</Text>
		{measures.map(measure => (
			<MeasuresTile key={measure.id} 
				measure={measure}
				bg={selectedMeasure?.id === measure.id ? '#cccccc44' : 'white'}
				border={selectedMeasure?.id === measure.id ? '2px solid rgb(129, 133, 255)' : 'default'} 
				onClick={() => selectMeasure(measure.id)} />
		))}
		</VStack>
	);
}