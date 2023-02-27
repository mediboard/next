import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Flex,
  ColorModeScript
} from '@chakra-ui/react';
import PageBody from '../../components/PageBody';
import { theme } from '../_app';
import usersHttpClient from '../../services/clientapis/UsersHttpClient';
import { Auth } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';


export default function SuccessPage(props) {
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
  const { session_id } = router.query;

  const { user } = useAuthenticator((context) => [context.user]);

  const [propsAreLoading, setPropsAreLoading] = useState(true);

  useEffect(() => {
    if (session_id && user && user.attributes['custom:stripeId'] == null) {
      addStripeProps();
    }
  }, [session_id, user])

  async function addStripeProps() {
    setPropsAreLoading(true);
    const session = await fetchFullSession();
    const cxId = session.customer;

    addStripeIdToUser(cxId).then(async data => {
      const apiKey = await getApiKey(cxId, user.username);
      addApiKeyToUser(apiKey).then(data => {
        setPropsAreLoading(false);
        router.push(`/users/${user.username}`)
      })
    });
  }

  async function getApiKey(stripeId, username) {
    return (await usersHttpClient.getToken(username, stripeId)).token;
  }

  async function addApiKeyToUser(apiKey) {
    return await Auth.updateUserAttributes(user, {'custom:apikey': apiKey})
  }

  async function addStripeIdToUser(stripeId) {
    return await Auth.updateUserAttributes(user, {'custom:stripeId': stripeId })
  }

  async function fetchFullSession() {
    return (await usersHttpClient.getSession(session_id)).session;
  }

  return (
    <PageBody>
      {'Thank you!'}
    </PageBody>
  )
}