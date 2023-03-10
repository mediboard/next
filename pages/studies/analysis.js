import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  ColorModeScript,
  Flex,
} from '@chakra-ui/react';
import Header from '../../components/Header';
import AttributesCard from '../../components/analytics/AttributesCard';
import { theme } from '../_app';


export default function Analysis() {
  return (
    <>
      <Main />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
  )
}

function Main() {
  return (
    <Box h='100vh' display='flex' flexGrow='1' flexDirection='column'>
      <Header />

      <Flex h='100%' display='flex' flexGrow='1' flexDirection='column'>
        <AttributesCard attribute='phase'/>
      </Flex>
    </Box>
  )
}