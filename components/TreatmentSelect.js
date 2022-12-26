import { useState } from 'react';
import { Select } from 'chakra-react-select';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import { Box } from '@chakra-ui/react';


export default function TreatmentSelect(props) {
	const {
		setSelectedTreatment,
		selectedTreatment,
		creatable,
		disabled,
		...kv
	} = props;
	const [treatments, setTreatments] = useState([]);

	async function searchTreatments(query) {
		if (query === '' || query == null) {
			return
		}

		treatmentHttpClient.search(query).then(response => {
			setTreatments((prev) => {
				let toAdd = [...response];

				const createOption = prev.filter(x => x.type === 'new')?.[0]
				if (createOption) {
					toAdd.push(createOption);
				}

				return toAdd;
			});

		}).catch(error => {
			console.log(error);
		})
	}

	async function createNewTreatment(name) {
		treatmentHttpClient.createTreatment({
			'name': name,
			'description': '',
			'from_study': false,
			'no_studies': -1,
			'no_prescriptions': -1
		}).then(data => {
			setSelectedTreatment(data?.treatment);
		}).catch(error => {
			console.log(error);
		})
	}

	function onChange(value) {
		if (value?.type === 'new') {
			createNewTreatment(value.name);
			return;
		}

		setSelectedTreatment(value);
	}

	function onInputChange(value) {
		searchTreatments(value);

		setTreatments(prev => ([...prev, {name: value, type: 'new'}]))
	}

	return (
		<Box {...kv}>
		<Select
			isDisabled={disabled}
  		size='md'
  		borderColor='purple.300'
  		value={selectedTreatment}
			onInputChange={(value) => { onInputChange(value) }}
			onChange={(value) => { onChange(value?.value) }}
			options={treatments.map(x => ({label: x.name, value: {...x}}))} />
		</Box>
	);
}