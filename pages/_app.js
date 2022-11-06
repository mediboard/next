import React, { useReducer } from 'react';
import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { 
  Button, 
  Card, 
  Text, 
  Heading,
  Badge } from '../styles/themeStyles';
import { Authenticator } from '@aws-amplify/ui-react';
import AppLayout from '../components/AppLayout';


export const theme = extendTheme({
  colors: {
    brand: {
      100: "#45AB5C",
      900: "#A07C5B",
    },
    purple: {
      100: "#C2C4FF",
      200: "#999CFF",
      300: "rgb(129, 133, 255)",
      400: "#7075FF",
      500: "#5C61FF",
      600: "#333AFF",
      700: "#0A12FF",
      800: "#0007E0",
      900: "#000593"
    },
    purpleHover: {
      100: "#C2C4FF88",
      200: "#999CFF88",
      300: "rgba(129, 133, 255, .5)",
      400: "#7075FF88",
      500: "#5C61FF88",
      600: "#333AFF88",
      700: "#0A12FF88",
      800: "#0007E088",
      900: "#00059388"
    },
    blue: {
      400: "#507DBC",
      600: "#1B58AE",
      900: "#19008A"
    },
    black: {
      500: "#1E1E1E"
    }
  },
  components: {
    Button,
    Card,
    Text,
    Heading,
    Badge
  },
})

export const SignInContext = React.createContext(null);

function userReducer(state, action) {
  switch (action?.type) {
    case 'NewUser':
      return {type: 'NewUser'}
    case 'SignIn':
      return {type: 'SignIn'}
    case 'Verify':
      return {type: 'Verify', username: action.body?.username}
    default:
      return undefined;
  }
}

function MyApp({ Component, pageProps }) {
  const [userAction, dispatchUserAction] = useReducer(userReducer);

  return (
    <Authenticator.Provider>
      <ChakraProvider theme={theme}>
      <SignInContext.Provider value={dispatchUserAction}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </SignInContext.Provider>
      </ChakraProvider>
    </Authenticator.Provider>
  )
}

export default MyApp
