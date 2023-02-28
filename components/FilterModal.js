import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  Button,
  Skeleton,
  IconButton,
  Box,
  Modal,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Flex,
  Checkbox,
  MenuItem,
  VStack,
  Spacer,
  Input
} from "@chakra-ui/react";
import { parseEnumType } from '../utils';
import MultiSelect from './MultiSelect';
import studyHttpClient from '../services/clientapis/StudyHttpClient';
import ConditionMultiSelect from './ConditionMultiSelect';
import TreatmentMultiSelect from './TreatmentMultiSelect';
import CheckableMenu from './CheckableMenu';
import DatePicker from "react-datepicker";
import FunnelIcon from './icons/FunnelIcon';
import FunnelOutlineIcon from './icons/FunnelOutlineIcon';


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

export default function FilterModal(props) {
  const { type, columnId, ...kv } = props;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [stringValue, setStringValue] = useState('');
  const [values, setValues] = useState([]);
  const [startDate, setStartDate] = useState(new Date(DEFUALT_DATE));
  const [endDate, setEndDate] = useState(new Date(DEFUALT_DATE));

  const isSelected = () => {
    if (type == 'Date') {
      return router.query[columnId+'_start'] || router.query[columnId+'_end'];
    }

    return router.query[columnId] || false;
  }

  useEffect(() => {
    if (router.isReady && type?.length) {
      preLoadFromUrl();
    }
  }, [router.isReady, type])

  function preLoadFromUrl() {
    switch(type) {
    case 'String':
      setStringValue(router.query[columnId]);
      break;

    case 'Values':
      setValues(router.query[columnId]?.split(',') || []);
      break;

    case 'Select':
      setValues(router.query[columnId]?.split(',') || []);
      break;

    case 'Date':
      const urlStart = router.query[columnId+'_start'];
      const defaultStart = urlStart ? new Date(urlStart + 'T00:00:00Z') : new Date(DEFUALT_DATE);
      setStartDate(defaultStart);

      const urlEnd = router.query[columnId+'_end'];
      const defaultEnd = urlEnd ? new Date(urlEnd + 'T00:00:00Z') : new Date(DEFUALT_DATE);
      setEndDate(defaultEnd);

      break;
    }
  }

  function setStringUrl() {
    if ((router.query[columnId] == stringValue) || (!stringValue?.length && !router.query[columnId])) {
      return;
    }

    router.query[columnId] = stringValue;
    if (!stringValue) {
      delete router.query[columnId];
    }

    router.push({
      pathname: router.pathname,
      query: router.query 
    })
  }

  function setValuesUrl() {
    const values_str = values.join(',');
    if ((router.query[columnId] == values_str) || (!values_str?.length && !router.query[columnId])) {
      return;
    }

    router.query[columnId] = values_str;
    if (!values_str) {
      delete router.query[columnId];
    }

    router.push({
      pathname: router.pathname,
      query: router.query
    })
  }

  function setDatesUrl() {
    const startStr = startDate.toISOString().substr(0, 10);
    if ((router.query[columnId+'_start'] == startStr) || (!startStr?.length && !router.query[columnId+'_start'])) {
      return;
    }

    const endStr = endDate.toISOString().substr(0, 10);
    if ((router.query[columnId+'_end'] == endStr) || (!endStr?.length && !router.query[columnId+'_end'])) {
      return;
    }

    router.query[columnId+'_start'] = startStr;
    if (!startStr || (startStr == DEFUALT_DATE.substr(0,10))) {
      delete router.query[columnId+'_start'];
    }

    router.query[columnId+'_end'] = endStr;
    if (!endStr || (endStr == DEFUALT_DATE.substr(0,10))) {
      delete router.query[columnId+'_end'];
    }

    router.push({
      pathname: router.pathname,
      query: router.query
    })
  }

  function onClose() {
    switch (type) {
    case 'String':
      setStringUrl();
      break;

    case 'Values':
      setValuesUrl();
      break;

    case 'Select':
      setValuesUrl();
      break;

    case 'Date':
      setDatesUrl();
      break;
    }

    setIsOpen(false);
  }

  return (
    <>
    <IconButton
      w='fit-content'
      h='fit-content'
      bg='none'
      icon={isSelected() ? <FunnelIcon w='20px' h='20px'/> : <FunnelOutlineIcon w='20px' h='20px'/>}
      onClick={() => setIsOpen(!isOpen)}/>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Filter ${parseEnumType(columnId)}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>{'Search'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
};