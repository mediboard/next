import { useState, useEffect } from 'react';
import { Select } from 'chakra-react-select';
import { Box } from '@chakra-ui/react';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';


export default function MeasureMultiSelect(props) {
	const { 
		measures,
		setMeasures,
		conditionId,
		treatmentName,
		initialIds,
		...kv } = props;

	const [options, setOptions] = useState([]);

	useEffect(() => {
		if (initialIds?.length && initialIds.length !== measures?.length) {
			preLoadMeasures();
		}
	}, [initialIds?.length])

	async function searchMeasures(query) {
		if (query === '' || query == null) { return; }

		treatmentHttpClient.searchMeasures(treatmentName, conditionId, query).then(response => {
			setOptions(response.measures);
		}).catch(error => {
			console.log(error);
		})
	}

	async function preLoadMeasures() {
		const existingMeasures = measures?.filter(x => initialIds?.includes(x.id))?.map(x => x.id);
		const diffedIds = initialIds?.filter(x => !existingMeasures.includes(x));

		const newMeasures =  await fetchMeasures(diffedIds);
		setMeasures([...measures, ...newMeasures]);
	}

	async function fetchMeasures(ids) {
		const newMeasures = await Promise.all(ids.map(async id => (
			await treatmentHttpClient.getMeasure(id)
		)));

		return await newMeasures;
	}

	return (
		<Box w='100%'>
			<Select
				isMulti
				size='md'
				chakraStyles={{
					control: (provided, state) => ({
						...provided,
						borderRadius: 0,
						border: 'none',
						...kv
	        }),
					dropdownIndicator: (provided) => ({
						...provided,
						bg: "transparent",
						cursor: "inherit"
					}),
					indicatorSeparator: (provided) => ({
						...provided,
						display: "none"
					})
				}}
				borderColor='purple.300'
				value={measures?.map(x => ({label: x.title, value: x}))}
				onInputChange={(value) => { searchMeasures(value) }}
				onChange={(values) => { setMeasures(values.map(x => x.value)); }}
				options={options?.map(x => ({label: x.title, value: x}))} {...kv} />
		</Box>
	)
}