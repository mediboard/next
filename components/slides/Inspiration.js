import Image from 'next/image';
import { Flex } from '@chakra-ui/react';


export default function Inspiration() {
  return (
    <Flex alignItems='center' justifyContent='center' w='100%'>
      <Image src='/inspirationSlide.svg' width='1600' height='600' />
    </Flex>
  );
}