import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { 
  Button, 
  Card, 
  Text, 
  Heading,
  Badge } from '../styles/themeStyles';


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

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
