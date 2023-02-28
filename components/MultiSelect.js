import { useState, useEffect } from 'react';
import { Select } from 'chakra-react-select';
import studyHttpClient from '../services/clientapis/StudyHttpClient';

import { Box } from '@chakra-ui/react';


export default function MultiSelect(props) {
  const { selectedValues, setSelectedValues, valueType, ...kv } = props;

  const [options, setOptions] = useState([]);

  async function searchValues(query) {
    studyHttpClient.searchValues(valueType, query).then(response => {
      setOptions(response.values?.map(val => ({label: val, value: val})));
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
        value={selectedValues?.map(val => ({label: val, value: val}))}
        onInputChange={(query) => { searchValues(query) }}
        onChange={(values) => { setSelectedValues(values?.map(val => val.value)); }}
        options={options || []} {...kv} />
    </Box>

  );
}