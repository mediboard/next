import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  ColorModeScript,
  Flex,
  Text,
  Box,
  VStack,
  Heading,
  SimpleGrid,
  Spacer,
  Button
} from '@chakra-ui/react';
import { theme } from './_app';

export default function Home() {
  return (
    <>
      <LandingPage />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
  )
}

export function LandingPage() {
  return (
    <Flex flexDirection='column' w='100%'>
      <SimpleGrid w='100%' columns={2} bg={'#8285F888'} p={20}>
        <VStack spacing={5} alignItems='start'>
          <Heading>{'Make Better'}</Heading>
          <Heading>{'Health Decisions'}</Heading>
          <Text>{'Clinical trial data made accessible, plus the tools you need to understand your prescription. Join the MediBoard community today. '}</Text>
          <Button>{'Join Now'}</Button>
        </VStack>
        <Flex w='100%'>
          <Spacer />
          <Image src='/Study_MacBook.png' height={500} width={500} />
        </Flex>
      </SimpleGrid>

      <Box pt={14} pb={20} pl={20} pr={20}>
      <Heading mb={12}>{'The Latest From Mediboard'}</Heading>
      <SimpleGrid w='100%' columns={3}>
        <Flex flexDirection='column' alignItems='start' w='70%'>
          <Heading mb={4}>{'Lorem Ipsum'}</Heading>
          <Text mb={10}>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in tempor neque.'}</Text>
          <Button>{'Learn more'}</Button>
        </Flex>
        <Flex flexDirection='column' alignItems='start' w='70%'>
          <Heading mb={4}>{'Lorem Ipsum'}</Heading>
          <Text mb={10}>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in tempor neque.'}</Text>
          <Button>{'Learn more'}</Button>
        </Flex>
        <Flex flexDirection='column' alignItems='start' w='70%'>
          <Heading mb={4}>{'Lorem Ipsum'}</Heading>
          <Text mb={10}>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in tempor neque.'}</Text>
          <Button>{'Learn more'}</Button>
        </Flex>
      </SimpleGrid>
      </Box>

      <Box p={5}>
      <SimpleGrid p={12} columns={2} w='100%' bg='#ECEFF1' borderRadius={4}>
        <Flex mr={20}>
          <Spacer />
          <Image src='/Study_MacBook.png' height={500} width={500} />
        </Flex>
        <Flex flexDirection='column' alignItems='start' w='60%' ml={20}>
          <Heading mb={3}>{'Make Better Informed'}</Heading>
          <Heading mb={4}>{'Health Decisions'}</Heading>
          <Text mb={10}>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in tempor neque.'}</Text>
          <Button>{'Learn More'}</Button>
        </Flex>
      </SimpleGrid>
      </Box>

      <SimpleGrid columns={2} p={20}>
        <Flex flexDirection='column' alignItems='start' w='60%'>
          <Heading mb={3}>{'Make Better Informed'}</Heading>
          <Heading mb={4}>{'Health Decisions'}</Heading>
          <Text mb={10}>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in tempor neque.'}</Text>
          <Button>{'Learn More'}</Button>
        </Flex>
        <Flex>
          <Spacer />
          <Image src='/Study_MacBook.png' height={500} width={500} />
        </Flex>
      </SimpleGrid>

      <SimpleGrid p={20} columns={2} w='100%' bg='#8285F888' borderRadius={4}>
        <Flex mr={20}>
          <Spacer />
          <Image src='/Study_MacBook.png' height={500} width={500} />
        </Flex>
        <Flex flexDirection='column' alignItems='start' w='60%' ml={20}>
          <Heading mb={3}>{'Make Better Informed'}</Heading>
          <Heading mb={4}>{'Health Decisions'}</Heading>
          <Text mb={10}>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in tempor neque.'}</Text>
          <Button>{'Learn More'}</Button>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}
