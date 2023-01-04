import Image from 'next/image';
import { Flex } from '@chakra-ui/react';


export default function Relevant() {
  return (
    <Flex alignItems='center' justifyContent='center' w='100%'>
      <Image src='/relevantSlide.svg' width='1600' height='600' />
    </Flex>
  );
}