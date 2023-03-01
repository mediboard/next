import { useContext } from 'react';
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
import { theme, SignInContext } from './_app';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Header from '../components/Header'


export default function Home() {
  return (
    <>
      <Head>
        <title>{`The Medical Board: Learn the truth about your medication.`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={'MediBoard gives users access to high quality medical data so that they can choose treatments themselves.'} />
        <meta name="og:title" content={'The Medical Board: Learn the truth about your medication.'} />
        <meta name="og:description" content="MediBoard gives users access to high quality medical data so that they can choose treatments themselves." />
      </Head>
      <LandingPage />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
  )
}

export function LandingPage() {
  const signInContext = useContext(SignInContext);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <>
    <Header />
    
    <Flex flexDirection='column' w='100%'>
      <SimpleGrid w='100%' columns={[1, 2]} bg={'#8285F888'} p={[10, 20]}>
        <Flex flexDirection='column' alignItems='start' w={['100%', '60%']}>
          <Heading mb={[1,3]}>{'Make Better'}</Heading>
          <Heading mb={4}>{'Health Decisions'}</Heading>
          <Text mb={10}>{'Clinical trial data made accessible, plus the tools you need to understand your prescription. Join the MediBoard community today. '}</Text>
          <Button 
            variant={!user ? "purple" : "disabled"}
            onClick={() => {signInContext({'type': 'NewUser'})}}>
            {!user ? 'Join Beta Now' : "We'll contact you soon"}
          </Button>
        </Flex>
        <Flex w='100%' mt={[10, 0]}>
          <Spacer />
          <Image src='/Study_MacBook.png' height={500} width={500} />
        </Flex>
      </SimpleGrid>

      <Box pt={14} pb={[10,20]} pl={[10,20]} pr={[10,20]}>
      <Heading mb={12}>{'Features Designed to give you a Choice'}</Heading>
      <SimpleGrid w='100%' columns={[1,3]} spacing={[10, 0]}>
        <Flex flexDirection='column' alignItems='start' w={['100%','70%']}>
          <Heading fontSize='20px' mb={4}>{'Compare Treatments'}</Heading>
          <Text mb={[6,10]}>{'See which treatments are the most effective and which ones have the worst side effects.'}</Text>
          <Button variant='outlined'>{'Learn more'}</Button>
        </Flex>

        <Flex flexDirection='column' alignItems='start' w={['100%','70%']}>
          <Heading fontSize='20px' mb={4}>{'Get Connected'}</Heading>
          <Text mb={[6,10]}>{'See what other people like you think. Submit your own treatment experiences and evaluate the ones present.'}</Text>
          <Button variant='outlined'>{'Learn more'}</Button>
        </Flex>

        <Flex flexDirection='column' alignItems='start' w={['100%','70%']}>
          <Heading fontSize='20px' mb={4}>{'Information for your Demographic'}</Heading>
          <Text mb={[6,10]}>{'We parse insights from clinical data to see differences in gender, age, and race.'}</Text>
          <Button variant='outlined'>{'Learn more'}</Button>
        </Flex>
      </SimpleGrid>
      </Box>

      <Box p={5}>
      <SimpleGrid p={[5,12]} columns={[1,2]} spacing={[10,0]} w='100%' bg='#ECEFF1' borderRadius={4}>
        <Flex mr={[0,20]}>
          <Spacer />
          <Image src='/phones.png' height={500} width={400} />
        </Flex>
        <Flex flexDirection='column' alignItems='start' w={['100%','60%']} ml={[0,20]}>
          <Heading mb={[0,3]}>{'Be Your'}</Heading>
          <Heading mb={4}>{'Own Doctor'}</Heading>
          <Text mb={10}>{'We give your the tools you need to choose the best treatment. Information like likelihood of side effects, demographics of each medication, how effective the medication is compared to alternatives, and more.'}</Text>
        </Flex>
      </SimpleGrid>
      </Box>

      <SimpleGrid columns={[1,2]} p={[10,20]}>
        <Flex flexDirection='column' alignItems='start' w={['100%','60%']}>
          <Heading mb={[0,3]}>{'Information'}</Heading>
          <Heading mb={4}>{'Personalized for you'}</Heading>
          <Text mb={10}>{'Have you ever wondered how the side effects differ from men to women? We parse tens of thousands of clinical trials to see how treatments effect different groups.'}</Text>
        </Flex>
        <Flex>
          <Spacer />
          <Image src='/BaselinesPic.png' height={500} width={700} />
        </Flex>
      </SimpleGrid>

      <SimpleGrid p={[10,20]} spacing={[10,0]} columns={[1,2]} w='100%' bg='#8285F888'>
        <Flex mr={[0,20]}>
          <Spacer />
          <Image src='/EffectsPic.png' height={900} width={900} />
        </Flex>
        <Flex flexDirection='column' alignItems='start' w={['100%','60%']} ml={[0,20]}>
          <Heading mb={[0,3]}>{'See Real Medical'}</Heading>
          <Heading mb={4}>{'Data'}</Heading>
          <Text mb={10}>{'Medical data that you can measure and compare, parsed from tens of thousands of clinical trials.'}</Text>
          <Button 
            variant={!user ? "purple" : "disabled"}
            onClick={() => {signInContext({'type': 'NewUser'})}}>
            {!user ? 'Join Beta Now' : "We'll contact you soon"}
          </Button>
        </Flex>
      </SimpleGrid>
    </Flex>
    </>
  );
}
