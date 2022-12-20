import { useState, useEffect } from 'react';
import { Select } from 'chakra-react-select';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import { Box } from '@chakra-ui/react';


export default function TreatmentMultiSelect(props) {
	const { treatments, setTreatments, initialNames, ...kv } = props;

	const [options, setOptions] = useState([]);

	useEffect(() => {
		if (initialNames?.length && initialNames?.length !== treatments?.length) {
			preLoadTreatments();
		}
	}, [initialNames?.length])

	async function searchTreatments(query) {
		if (query === '' || query == null) { return; }

		treatmentHttpClient.search(query).then(response => {
			setOptions(response);
		}).catch(error => {
			console.log(error);
		})
	}

	async function preLoadTreatments() {
		//Fill in existing treatments
		const existingTreatments = treatments?.filter(x => initialNames?.includes(x.name));
		const diffedNames = initialNames.filter(x => !existingTreatments.map(c => c.name).includes(x));

		const newTreatments = await fetchTreatments(diffedNames);
		setTreatments([...treatments, ...newTreatments]);
	}

	async function fetchTreatments(names) {
		const newTreatments = await Promise.all(names.map(async name => (
			await treatmentHttpClient.getTreatment(name)
		)));

		return await newTreatments;
	}


	return (
		<Box w='100%'>
			<Select
				isMulti
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
				size='md'
				borderColor='purple.300'
				value={treatments?.map(x => ({label: x.name, value: x}))}
				onInputChange={(value) => { searchTreatments(value) }}
				onChange={(values) => { setTreatments(values?.map(x => x.value)); }}
				options={options?.map(x => ({label: x.name, value: {...x}}))} {...kv} />
		</Box>
	);
}