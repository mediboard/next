import { useState, useEffect } from 'react';
import Tile from '../Tile';
import {
  Text,
  Spacer,
  Button,
  Flex
} from '@chakra-ui/react';
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
    <Tile h='fit-content' w='100%'>
      <Flex alignItems='center'>
        <Text>{'API Key'}</Text>
        <Spacer />
        {user?.attributes['custom:apikey'] ? 
          <Text>{user?.attributes['custom:apikey']}</Text> :
          <Button onClick={onClick}>{'Purchase API Key'}</Button>}
      </Flex>
    </Tile>
  )
}