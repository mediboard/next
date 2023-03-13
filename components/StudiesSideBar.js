import {
  useDisclosure,
  Collapse,
  IconButton,
  Flex,
  Box
} from '@chakra-ui/react';
import GraphIcon from './icons/GraphIcon';
import HorizontalCollapse from './HorizontalCollapse';
import SearchesDeck from './analytics/SearchesDeck';


export default function StudiesSideBar(props) {
  const { ...kv } = props;
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();

  return (
    <Flex {...kv} bg='white' zIndex={3}>
      <IconButton
        {...getButtonProps()} 
        m={2}
        icon={<GraphIcon />}/>

      <HorizontalCollapse
        isOpen={isOpen}
        getDisclosureProps={getDisclosureProps}>
        <SearchesDeck />
      </HorizontalCollapse>
    </Flex>
  )
}