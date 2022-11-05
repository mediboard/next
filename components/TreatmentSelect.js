import { useState } from 'react';
import { Select } from 'chakra-react-select';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import { Box } from '@chakra-ui/react';


export default function TreatmentSelect(props) {
	const {
		setSelectedTreatment,
		selectedTreatment,
		disabled,
		...kv
	} = props;
	const [treatments, setTreatments] = useState([]);

	async function searchTreatments(query) {
		if (query === '' || query == null) {
			return
		}

		treatmentHttpClient.search(query).then(response => {
			setTreatments(response);
		}).catch(error => {
			console.log(error);
		})
	}

	return (
		<Box {...kv}>
		<Select
			isDisabled={disabled}
  		size='md'
  		borderColor='purple.300'
  		value={selectedTreatment}
			onInputChange={(value) => { searchTreatments(value) }}
			onChange={(value) => { setSelectedTreatment(value?.value) }}
			options={treatments.map(x => ({label: x.name, value: {...x}}))} />
		</Box>
	);
}