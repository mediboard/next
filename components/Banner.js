import {
  Flex,
} from '@chakra-ui/react';


export default function Banner(props) {
  const { children, ...kv } = props;

  return (
    <Flex w='100%'
      bg='white'
      borderBottom={"1px solid var(--chakra-colors-chakra-border-color)"}
      pt={5} pb={5}
      pl={5} pr={5}>
    {children}
    </Flex>
  )
}