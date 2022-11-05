import { useState, useEffect } from 'react';
import Measure from './Measure';
import studyHttpClient from '../../../services/clientapis/StudyHttpClient';


export default function MeasureOverview(props) {
	const { study, groups, ...kv } = props

	const [measureData, setMeasureData] = useState(undefined);
	const [measureIsLoading, setMeasureIsLoading] = useState(true);

	useEffect(() => {
		if (study?.id) {
			loadMeasureData(study.id);
		}
	}, [study?.id])

	async function loadMeasureData(study_id) {
		setMeasureIsLoading(true);
		studyHttpClient.getMeasures(study_id, 1, true).then(data => {
			setMeasureData(data?.measures?.[0]);
		}).catch(error => {
			console.log(error);
		}).finally(() => {
			setMeasureIsLoading(false);
		})
	}

	return (
		<Measure measureData={measureData} 
			groupData={groups?.filter(group => measureData?.outcomes?.map(out => out.group)?.includes(group.id))} />
	)
}