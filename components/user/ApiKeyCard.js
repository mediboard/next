import { useState, useEffect } from 'react';
import Tile from '../Tile';
import {
  Spacer,
  Button,
  Heading,
  Flex
} from '@chakra-ui/react';
import CopyText from '../CopyText';
import usersHttpClient from '../../services/clientapis/UsersHttpClient';


export default function ApiKeyCard(props) {
  const { user, ...kv } = props;
  const [checkoutIsLoading, setCheckoutIsLoading] = useState(false);

  function onClick() {
    setCheckoutIsLoading(true);
    usersHttpClient.checkout().then(data => {
      window.open(data.session.url, '_blank')
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setCheckoutIsLoading(false);
    });
  }

  return (
    <Tile h='fit-content' w='100%' {...kv}>
      <Flex alignItems='center'>
        <Heading size='sm'>{'API Key'}</Heading>
        <Spacer />
        {user?.attributes['custom:apikey'] ? 
          <CopyText minW={'700px'}>{user?.attributes['custom:apikey']}</CopyText> :
          <Button onClick={onClick}>{'Purchase API Key'}</Button>}
      </Flex>
    </Tile>
  )
}