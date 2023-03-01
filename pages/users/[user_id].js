import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Flex,
  ColorModeScript
} from '@chakra-ui/react';
import PageBody from '../../components/PageBody';
import ApiKeyCard from '../../components/user/ApiKeyCard';
import Header from '../../components/Header';
import { theme } from '../_app';
import { useAuthenticator } from '@aws-amplify/ui-react';


export default function UserPage(props) {
  return (
    <>
      <Head>
        <title>{"User config pagge"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main {...props} />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
  );
}


function Main(props) {
  const router = useRouter();
  const { user_id } = router.query;

  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <>
    <Header />
    <PageBody bg='gray.100' mt={0}>
      <Flex minH='90vh' 
        flexDirection={['column', 'row']}
        w='100%'
        borderRadius={4}
        m={['0%', '2.5%']}
        pb={5}
        alignItems='stretch'>
        <ApiKeyCard user={user} bg='white'/>
      </Flex>
    </PageBody>
    </>
  );
}