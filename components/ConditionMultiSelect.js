import { useState, useEffect } from 'react';
import { Select } from 'chakra-react-select';
import conditionsHttpClient from '../services/clientapis/ConditionsHttpClient';
import { Box } from '@chakra-ui/react';


export default function ConditionMultiSelect(props) {
	const { conditions, setConditions, initialNames, ...kv } = props;

	const [options, setOptions] = useState([]);

	useEffect(() => {
		if (initialNames?.length && initialNames?.length !== conditions?.length) {
			preLoadConditions();
		}
	}, [initialNames?.length])

	async function searchConditions(query) {
		if (query === '' || query == null) { return; }

		conditionsHttpClient.search(query).then(response => {
			setOptions(response);
		}).catch(error => {
			console.log(error);
		})
	}

	async function preLoadConditions() {
		//Fill in existing conditions
		const existingConditions = conditions?.filter(x => initialNames?.includes(x.name));
		const diffedNames = initialNames.filter(x => !existingConditions.map(c => c.name).includes(x));

		const newConditions = await fetchConditions(diffedNames);
		setConditions([...conditions, ...newConditions]);
	}

	async function fetchConditions(names) {
		const newConditions = await Promise.all(names.map(async name => (
			await conditionsHttpClient.getCondition(name)
		)));

		return await newConditions;
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
				value={conditions?.map(x => ({label: x.name, value: x}))}
				onInputChange={(value) => { searchConditions(value) }}
				onChange={(values) => { setConditions(values.map(x => x.value)); }}
				options={options?.map(x => ({label: x.name, value: x})) || []} {...kv} />
		</Box>
	);
}