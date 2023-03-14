import {
  useDisclosure,
  Collapse,
  IconButton,
  VStack,
  Flex,
  Box
} from '@chakra-ui/react';
import GraphIcon from './icons/GraphIcon';
import FunnelIcon from './icons/FunnelIcon';
import { SearchIcon } from '@chakra-ui/icons';
import HorizontalCollapse from './HorizontalCollapse';
import SearchesDeck from './analytics/SearchesDeck';
import FilterBody from './FilterBody';


export default function StudiesSideBar(props) {
  const { 
    selectedColumn,
    search,
    setSearch,
    mode,
    setMode,
    ...kv
  } = props;
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();

  function onClick(type) {
    if (type && (type === mode)) {
      setMode(undefined);
      return;
    }

    setMode(type);
  }

  return (
    <Flex {...kv} bg='white' zIndex={3} 
      borderLeft='1px' borderColor='var(--chakra-colors-chakra-border-color)'>
      <Flex flexDirection='column' borderRight='1px' 
        borderColor='var(--chakra-colors-chakra-border-color)'>
        <IconButton
          p={4} pt={7} pb={7} 
          bg={mode === 'search' ? 'blue.100' : 'clear'} 
          borderRadius={0} borderBottomWidth='1px'
          color={mode === 'search' ? 'blue.600' : 'gray.500'}
          onClick={() => onClick('search')}
          icon={<SearchIcon h='20px' w='20px'/>}/>
        <IconButton
          p={4} pt={7} pb={7} 
          bg={mode === 'analyze' ? 'blue.100' : 'clear'} 
          borderRadius={0}
          borderBottomWidth='1px'
          onClick={() => onClick('analyze')} 
          icon={
          <GraphIcon 
            fill={mode === 'analyze' ? 'blue.600' : 'gray.500'} 
            h='30px' w='30px'/>}/>
        <IconButton
          p={4} pt={7} pb={7} 
          bg={mode === 'filter' ? 'blue.100' : 'clear'} 
          borderRadius={0}
          borderBottomWidth='1px'
          color='gray.400'
          onClick={() => onClick('filter')}
          icon={
            <FunnelIcon 
              fill={mode === 'filter' ? 'blue.600' : 'gray.500'}/>}/>
      </Flex>

      <HorizontalCollapse
        isOpen={mode !== undefined}
        getDisclosureProps={getDisclosureProps}>
        <Box p={5}>
          {(mode === 'filter') && <FilterBody 
            type={selectedColumn?.type}
            columnId={selectedColumn?.id}
            searchString={search?.search_string}
            setSearchString={(str) => {setSearch({...search, search_string: str})}} />}
          {(mode === 'search') && <SearchesDeck currentSearch={search}/>}
        </Box>
      </HorizontalCollapse>
    </Flex>
  )
}