import { useState } from 'react';
import { Select } from 'chakra-react-select';
import conditionsHttpClient from '../services/clientapis/ConditionsHttpClient';
import { Box } from '@chakra-ui/react';


export default function ConditionMultiSelect(props) {
	const { conditionNames, setConditionNames, ...kv } = props;

	const [options, setOptions] = useState([]);

	async function searchConditions(query) {
		if (query === '' || query == null) { return; }

		conditionsHttpClient.search(query).then(response => {
			setOptions(response);
		}).catch(error => {
			console.log(error);
		})
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
				value={conditionNames?.map(x => ({label: x, value: x}))}
				onInputChange={(value) => { searchConditions(value) }}
				onChange={(values) => { setConditionNames(values?.map(x => x.value.name.toLowerCase())); }}
				options={options?.map(x => ({label: x.name, value: {...x}}))} {...kv} />
		</Box>
	);
}