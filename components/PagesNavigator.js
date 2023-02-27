import {
  Flex,
  Spacer,
  HStack,
  Skeleton,
  VStack,
  Link,
  LinkOverlay,
  Button,
  LinkBox,
  Box,
  Square,
  Text,
  useBreakpointValue
} from '@chakra-ui/react'
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';


export function PageButton(props) {
  const { children, color, bg, fontWeight, borderColor, borderWidth, onClick, ...kv } = props;

  return (
    <Box pl={1} pr={1} {...kv}>
      <Square h='100%' w='100%' 
        bg={bg || 'clear'} borderRadius={4} 
        borderColor={borderColor}
        borderWidth={borderWidth}
        onClick={onClick}>
        <Text fontSize={'14px'} fontWeight={fontWeight || '500'} color={color || 'black'}>{children}</Text>
      </Square>
    </Box>
  );
}

export default function PagesNavigator(props) {
  const { no_pages, page_no, onPageClick, ...kv } = props;

  const noButtons = useBreakpointValue({ base: 4, md:4, lg: 4 });

  return (
    <HStack w='100%' mt={10} alignItems='stretch' spacing={1} {...kv}>
      <Flex w={['60%', '100%']} alignItems='stretch'>
        <Button
          bg='gray.300' color='black'
          w={['20%', `${100/(noButtons +2)}`]} 
          onClick={() => {if (page_no > 1) { onPageClick(page_no-1); }}}>{'Prev'}</Button>

        {[... new Array(no_pages).keys()].slice((page_no-1), (page_no-1) + noButtons)?.map((x, i) => {
          if (i === (noButtons - 2) && no_pages >= noButtons) {
            return (
              <PageButton key={x+'-page-button'}
                bg='gray.300'
                onClick={onPageClick}
                w={`${100/noButtons}%`}>{'...'}</PageButton>
            );
          }

          if (i === (noButtons - 1) && no_pages >= noButtons) {
            return (
              <PageButton key={x+'-page-button'}
                onClick={() => onPageClick(no_pages)}
                bg='gray.300'
                w={`${100/noButtons}%`}>{no_pages}</PageButton>
            );
          }

          return (
            <PageButton key={x+'-page-button'}
              bg={page_no === x + 1 ? 'purple.300' : 'gray.300'}
              fontWeight={page_no === x + 1 ? '800' : '500'}
              color={page_no === x + 1 ? 'white' : 'black'}
              onClick={() => onPageClick(x+1)}
              w={`${100/noButtons}%`}>{x + 1}</PageButton>
          );
        })}

        <Button 
          w={['20%', `${100/(noButtons +2)}`]}
          bg='gray.300' m={0} color='black'
          onClick={() => {if(page_no < no_pages) { onPageClick(page_no+1)}}}>
          {'Next'}
        </Button>
      </Flex>
    </HStack>
  )
}