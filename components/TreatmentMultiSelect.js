import { useState } from 'react';
import { Select } from 'chakra-react-select';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import { Box } from '@chakra-ui/react';


export default function TreatmentMultiSelect(props) {
	const { treatmentNames, setTreatmentNames, ...kv } = props;

	const [options, setOptions] = useState([]);

	async function searchTreatments(query) {
		if (query === '' || query == null) { return; }

		treatmentHttpClient.search(query).then(response => {
			setOptions(response);
		}).catch(error => {
			console.log(error);
		})
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
				value={treatmentNames?.map(x => ({label: x, value: x}))}
				onInputChange={(value) => { searchTreatments(value) }}
				onChange={(values) => { setTreatmentNames(values?.map(x => x.value.name.toLowerCase())); }}
				options={options?.map(x => ({label: x.name, value: {...x}}))} {...kv} />
		</Box>
	);
}