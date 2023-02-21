import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Flex,
  Checkbox,
  MenuItem,
  VStack,
  Input
} from "@chakra-ui/react";
import MultiSelect from './MultiSelect';
import studyHttpClient from '../services/clientapis/StudyHttpClient';
import ConditionMultiSelect from './ConditionMultiSelect';
import TreatmentMultiSelect from './TreatmentMultiSelect';
import CheckableMenu from './CheckableMenu';


const StringBody = ({value, setValue}) => (
  <Input 
    placeholder="search string"
    value={value}
    onChange={(e) => setValue(e.target.value)}/>
)

const ValuesBody = ({selectedValues, setSelectedValues, valueType}) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    loadValues()
  }, [])

  async function loadValues() {
    studyHttpClient.listValues(valueType).then(data => {
      setValues(data.values);
    }).catch(error => {
      console.log(error);
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
    <VStack>
    {values.map((option) => (
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

const SelectBody = ({options, setOptions, optionsType}) => (
  <MultiSelect 
    selectedValues={options}
    setSelectedValues={setOptions}
    valueType={optionsType}/>
)


export default function FilterModal(props) {
  const { type, name, columnId, ...kv } = props;
  // Type: Date, String, Values, Select Values

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [stringValue, setStringValue] = useState('');
  const [values, setValues] = useState([]);

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
    }
  }

  // Set the value in the url on close 

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
    }

    setIsOpen(false);
  }

  return (
    <>
    <Button onClick={() => setIsOpen(!isOpen)}>{'Filter'}</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {(type === 'String') && <StringBody setValue={setStringValue} value={stringValue}/>}
          {(type === 'Values') && <ValuesBody 
            setSelectedValues={setValues}
            valueType={columnId}
            selectedValues={values}/>}
          {(type === 'Select') && <SelectBody 
            setOptions={setValues}
            optionsType={columnId}
            options={values}/>}
          <Button onClick={onClose}>{'Search'}</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
};