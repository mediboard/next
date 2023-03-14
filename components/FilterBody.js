import { useState, useEffect } from "react";
import {
  Flex,
  Button,
  Input,
  VStack,
  Skeleton,
  Box,
  Checkbox,
  Spacer
} from '@chakra-ui/react';
import DatePicker from "react-datepicker";
import { parseQueryString, buildQueryString } from '../utils';
import studyHttpClient from '../services/clientapis/StudyHttpClient';


const StringBody = ({value, setValue}) => (
  <Input 
    placeholder="search string"
    value={value}
    onChange={(e) => setValue(e.target.value)}/>
)

const DateBody = ({startDate, setStartDate, endDate, setEndDate}) => (
  <Flex>
    <Box border='1px solid grey' borderRadius={4} p={1}>
      <DatePicker
        showYearDropdown
        selected={startDate}
        onChange={(date) => setStartDate(date)} />
    </Box>
    <Spacer />
    <Box border='1px solid grey' borderRadius={4} p={1}>
      <DatePicker
        showYearDropdown
        selected={endDate}
        onChange={(date) => setEndDate(date)} />
    </Box>
  </Flex>
)

const ValuesBody = ({selectedValues, setSelectedValues, valueType}) => {
  const [values, setValues] = useState([]);
  const [valuesAreLoading, setValuesAreLoading] = useState(true);

  useEffect(() => {
    loadValues()
  }, [])

  async function loadValues() {
    setValuesAreLoading(true);
    studyHttpClient.listValues(valueType).then(data => {
      setValues(data.values);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setValuesAreLoading(false);
    })
  }

  function onOptionToggle(optionId) {
    if (selectedValues?.includes(optionId)) {
      setSelectedValues(selectedValues.filter(val => val != optionId));
      return;
    }

    setSelectedValues([...selectedValues, optionId]);
  }

  return (
    <VStack align='start'>
    {valuesAreLoading && [... new Array(8)].map((x,i) => (
      <Flex key={i+'-checkbox-skeleton'} w='100%'>
        <Skeleton w={5} h={5} mr={2} mb={2}/>
        <Skeleton w={'70%'} h={5} />
      </Flex>
    ))}
    {!valuesAreLoading && values.map((option) => (
      <Flex key={option+'-checkbox'}>
        <Checkbox
          isChecked={selectedValues?.includes(option)}
          onChange={(e) => onOptionToggle(option)}
          mr="2"/>
        {option}
      </Flex>
    ))}
    </VStack>
  )
}

const SelectBody = ({options, setOptions, optionsType}) => {
  if (optionsType == 'conditions') {
    return (
      <ConditionMultiSelect 
        conditions={options?.map(x => ({name: x}))}
        setConditions={(conditions) => setOptions(conditions.map(x => x.name))}/>)
  }

  if (optionsType == 'treatments') {
    return (
      <TreatmentMultiSelect 
        treatments={options?.map(x => ({name: x}))}
        setTreatments={(treats) => setOptions(treats.map(x => x.name))}/>)
  }

  return (<MultiSelect 
    selectedValues={options}
    setSelectedValues={setOptions}
    valueType={optionsType}/>)
}

const DEFUALT_DATE = '1970-01-01T00:00:00Z';

export default function FilterBody(props) {
  const { type, columnId, searchString, setSearchString, ...kv } = props;

  const [stringValue, setStringValue] = useState('');
  const [values, setValues] = useState([]);
  const [startDate, setStartDate] = useState(new Date(DEFUALT_DATE));
  const [endDate, setEndDate] = useState(new Date(DEFUALT_DATE));

  useEffect(() => {
    if (searchString?.length) {
      const queryParams = parseQueryString(searchString);
      console.log(queryParams)
      preLoadValues(queryParams);
    }
  }, [searchString])

  function preLoadValues(queryParams) {
    switch(type) {
    case 'String':
      setStringValue(queryParams[columnId]);
      break;

    case 'Values':
      setValues(queryParams[columnId]?.split(',') || []);
      break;

    case 'Select':
      setValues(queryParams[columnId]?.split(',') || []);
      break;

    case 'Date':
      const urlStart = queryParams[columnId+'_start'];
      const defaultStart = urlStart ? new Date(urlStart + 'T00:00:00Z') : new Date(DEFUALT_DATE);
      setStartDate(defaultStart);

      const urlEnd = queryParams[columnId+'_end'];
      const defaultEnd = urlEnd ? new Date(urlEnd + 'T00:00:00Z') : new Date(DEFUALT_DATE);
      setEndDate(defaultEnd);
      break;
    }
  }

  function onClick(e) {
    const newParams = parseQueryString(searchString);

    switch(type) {
    case 'String':
      newParams[columnId] = stringValue;
      if (!stringValue?.length) {
        delete newParams[columnId];
      }
      break;

    case 'Values':
      let values_str = values.join(',');
      newParams[columnId] = values_str;
      if (!values_str?.length) {
        delete newParams[columnId];
      }
      break;

    case 'Select':
      let select_str = values.join(',');
      newParams[columnId] = values_str;
      if (!select_str?.length) {
        delete newParams[columnId];
      }
      break;

    case 'Date':
      const startStr = startDate.toISOString().substr(0, 10);
      if ((newParams[columnId+'_start'] == startStr) || (!startStr?.length && !newParams[columnId+'_start'])) {
        return;
      }

      const endStr = endDate.toISOString().substr(0, 10);
      if ((newParams[columnId+'_end'] == endStr) || (!endStr?.length && !newParams[columnId+'_end'])) {
        return;
      }

      newParams[columnId+'_start'] = startStr;
      if (!startStr || (startStr == DEFUALT_DATE.substr(0,10))) {
        delete newParams[columnId+'_start'];
      }

      newParams[columnId+'_end'] = endStr;
      if (!endStr || (endStr == DEFUALT_DATE.substr(0,10))) {
        delete newParams[columnId+'_end'];
      }

      break;
    }

    setSearchString(buildQueryString(newParams));
  }

  return (
    <Flex>
      {(type === 'String') && <StringBody setValue={setStringValue} value={stringValue}/>}
      {(type === 'Date') && <DateBody
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}/>}
      {(type === 'Values') && <ValuesBody 
        setSelectedValues={setValues}
        valueType={columnId}
        selectedValues={values}/>}
      {(type === 'Select') && <SelectBody 
        setOptions={setValues}
        optionsType={columnId}
        options={values}/>}
      <Button onClick={onClick}>{'Search'}</Button>
    </Flex>
  )
}