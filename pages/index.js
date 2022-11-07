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
        <Flex flexDirection='column' alignItems='start' w='60%'>
          <Heading mb={3}>{'Make Better'}</Heading>
          <Heading mb={4}>{'Health Decisions'}</Heading>
          <Text mb={10}>{'Clinical trial data made accessible, plus the tools you need to understand your prescription. Join the MediBoard community today. '}</Text>
          <Button>{'Join Now'}</Button>
        </Flex>
        <Flex w='100%'>
          <Spacer />
          <Image src='/Study_MacBook.png' height={500} width={500} />
        </Flex>
      </SimpleGrid>

      <Box pt={14} pb={20} pl={20} pr={20}>
      <Heading mb={12}>{'Features Designed to give you a Choice'}</Heading>
      <SimpleGrid w='100%' columns={3}>
        <Flex flexDirection='column' alignItems='start' w='70%'>
          <Heading fontSize='20px' mb={4}>{'Compare Treatments'}</Heading>
          <Text mb={10}>{'See which treatment is the most effective and which one has the worst side effects. '}</Text>
          <Button variant='outlined'>{'Learn more'}</Button>
        </Flex>
        <Flex flexDirection='column' alignItems='start' w='70%'>
          <Heading fontSize='20px' mb={4}>{'Get Connected'}</Heading>
          <Text mb={10}>{'See what other people like you think. Submit your own treatment experiences and evaluate the ones present.'}</Text>
          <Button variant='outlined'>{'Learn more'}</Button>
        </Flex>
        <Flex flexDirection='column' alignItems='start' w='70%'>
          <Heading fontSize='20px' mb={4}>{'Information for your Demographic'}</Heading>
          <Text mb={10}>{'We parse insights from clinical data to see differences in gender, age, and race.'}</Text>
          <Button variant='outlined'>{'Learn more'}</Button>
        </Flex>
      </SimpleGrid>
      </Box>

      <Box p={5}>
      <SimpleGrid p={12} columns={2} w='100%' bg='#ECEFF1' borderRadius={4}>
        <Flex mr={20}>
          <Spacer />
          <Image src='/phones.png' height={500} width={400} />
        </Flex>
        <Flex flexDirection='column' alignItems='start' w='60%' ml={20}>
          <Heading mb={3}>{'Be Your'}</Heading>
          <Heading mb={4}>{'Own Doctor'}</Heading>
          <Text mb={10}>{'We give your the tools you need to make decisions about what treatment is best for you.'}</Text>
        </Flex>
      </SimpleGrid>
      </Box>

      <SimpleGrid columns={2} p={20}>
        <Flex flexDirection='column' alignItems='start' w='60%'>
          <Heading mb={3}>{'Information'}</Heading>
          <Heading mb={4}>{'Personalized for you'}</Heading>
          <Text mb={10}>{'Have you ever wondered how the side effects differ from men to women? We parse tens of thousands of clinical trials to see how treatments effect different groups.'}</Text>
        </Flex>
        <Flex>
          <Spacer />
          <Image src='/BaselinesPic.png' height={500} width={700} />
        </Flex>
      </SimpleGrid>

      <SimpleGrid p={20} columns={2} w='100%' bg='#8285F888' borderRadius={4}>
        <Flex mr={20}>
          <Spacer />
          <Image src='/EffectsPic.png' height={900} width={900} />
        </Flex>
        <Flex flexDirection='column' alignItems='start' w='60%' ml={20}>
          <Heading mb={3}>{'Make Better Informed'}</Heading>
          <Heading mb={4}>{'Health Decisions'}</Heading>
          <Text mb={10}>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in tempor neque.'}</Text>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}
