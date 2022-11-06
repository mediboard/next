import { useState } from 'react';
import { useCombobox } from 'downshift'
import { SearchIcon } from '@chakra-ui/icons';
import { 
	Badge,
  Box, 
  UnorderedList,
  ListItem,
  Text,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  Flex } from "@chakra-ui/react";
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import conditionsHttpClient from '../services/clientapis/ConditionsHttpClient';


export default function AutoSearch(props) {
  const [inputItems, setInputItems] = useState([]);
  const [conditionItems, setConditionItems] = useState([]);
  const [inputItemsAreLoading, setInputItemsAreLoading] = useState(true);

  const { setSearchInput, includeAllTreatments, includeAllConditions, condition, removeIcon, placeholder, ...kv } = props;

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    setInputValue
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
    	setSearchItems(inputValue.toLowerCase());
    },
    onSelectedItemChange: ({selectedItem}) => {
    	if (!selectedItem) { 
    		return;
    	}
    	setSearchInput(selectedItem);
    },
    itemToString: (item) => {
    	if (!item || !item.name) {
    		return '';
    	}
    	return item.name;
    }
  });

  async function setSearchItems(query) {
    var conditions = [];
    var treatments = [];
    if (includeAllConditions) conditions = await conditionsHttpClient.search(query);
    if (includeAllTreatments) treatments = await treatmentHttpClient.search(query);
    if (condition) treatments = await conditionsHttpClient.getTreatments(condition.name);

  	let items = [{name: query, itemType: 'Query'}]
      .concat(treatments.map(x => ({...x, itemType: 'Treatment'})))
      .concat(conditions.map(x => ({...x, itemType: 'Condition'})))
   
  	setInputItems(items);
  }

  return (
    <>
      <InputGroup {...kv} >
        {!removeIcon && <InputLeftElement
          pointerEvents='none' children={<SearchIcon color='black' />}/>}
        <Input
          placeholder={placeholder || 'search'}
          w='100%'
          bg='#E4E4E4'
          _placeholder={{ color: 'black' }}
          sx={{'borderRadius':4}}
          {...getInputProps()}
          />
     	</InputGroup>
     	<UnorderedList
     		zIndex='1'
		   	listStyleType= 'none'
     		position='absolute'
        top='45px'
     		w='300px'
     		align='stretch'
	     	{...getMenuProps()}>
	     	{isOpen &&
          inputItems.map((item, index) => (
            <ListItem
              style={
                highlightedIndex === index
                  ? { backgroundColor: '#bde4ff' }
                  : { backgroundColor: 'white'}
              }
              display='flex'
              align='left'
              p='1'
              key={`${item?.name}${index}`}
              {...getItemProps({ item, index })}>
               <Text
              	maxW='80%'
								textOverflow='ellipsis'
								whiteSpace='nowrap'
								overflow='hidden'>
	              {item.name}
	            </Text>
              <Spacer />
            </ListItem>
          ))}
     	</UnorderedList>
    </>
  )
}