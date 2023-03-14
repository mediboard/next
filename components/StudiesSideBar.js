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
  const { selectedColumn, searchString, setSearchString, mode, setMode, ...kv } = props;
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();

  function onClick(type) {
    if (type && (type === mode)) {
      setMode(undefined);
      return;
    }

    setMode(type);
  }

  return (
    <Flex {...kv} bg='white' zIndex={3}>
      <VStack p={2}>
        <IconButton
          onClick={() => onClick('search')}
          icon={<SearchIcon />}/>
        <IconButton
          onClick={() => onClick('analyze')}
          icon={<GraphIcon />}/>
        <IconButton
          onClick={() => onClick('filter')}
          icon={<FunnelIcon />}/>
      </VStack>

      <HorizontalCollapse
        isOpen={mode !== undefined}
        getDisclosureProps={getDisclosureProps}>
        <Box p={5}>
          {(mode === 'filter') && <FilterBody 
            type={selectedColumn?.type}
            columnId={selectedColumn?.id}
            searchString={searchString}
            setSearchString={setSearchString} />}
          {(mode === 'search') && <SearchesDeck />}
        </Box>
      </HorizontalCollapse>
    </Flex>
  )
}