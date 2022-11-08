import {useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { 
  Show,
  Hide,
  Spacer, 
  VStack, 
  HStack, 
  Box, 
  Heading, 
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Button,
  Flex } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import AutoSearch from './AutoSearch';
import { SignInContext } from '../pages/_app';
import { useAuthenticator } from '@aws-amplify/ui-react';
import UserButton from './UserButton';
import HeaderDropdown from './HeaderDropdown';
import { ReactComponent as BWLogo } from './icons/black_and_white.svg'


const componentId = 'shared/Header';

export const navNameToRoute = {
  'Compare Treatments': '/',
  Treatments: '/treatments',
  'Browse Studies': '/studies/browse',
  Conditions: '/medical/conditions',
  FAQ: '/medical/faq',
  Blog: '/blog/articles'
};

export default function Header() {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState({});

  const signInContext = useContext(SignInContext);

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const rgbaSelected = 'var(--chakra-colors-purple-300)';
  const rgbaHover = 'var(--chakra-colors-purpleHover-300)';

  useEffect(() => {
    if (searchInput && searchInput.itemType && searchInput.name) {
      router.push(`/search/query/${searchInput.name}`);
    }
  }, [searchInput])

  function NavButton({children}) {
    return (
      <Text id={children} 
        color='white'
        sx={{
        "&:hover": {
          cursor: 'pointer',
        }
      }} onClick={(e) => handleNavClick(e)}>{children}</Text>
    );
  };

  const handleNavClick = (e) => {
    router.push(navNameToRoute[e.target.id]);
  };

  const onLogoCLick = () => {
    router.push('/');
  }

  function onFeedbackClick() {
    feedbackDispatch({
      'isOpen': true
    });
  }

  return (
    <Box 
      align='false' 
      pt={[2,4]}
      pb={[2,4]}
      bg='#1E1E1E'
      spacing={0}
      w='100%'>
      <Flex
        pr={['5px', '15px']}
        pl={['5px', '15px']}
        alignItems='center'
        mt={0}>

        <Hide below='sm'>
        <Flex 
          w='15%'
          onClick={onLogoCLick}
          _hover={{cursor: 'pointer'}}
          justifyContent='center'
          alignItems='center'
          textAlign='center'>
          <Image src='/black_and_white.svg' width={220} height={60}/>
        </Flex>

        <Spacer />
        <AutoSearch w='40%' h='100%' includeAllTreatments includeAllConditions setSearchInput={setSearchInput}/>

        <Spacer />
        <NavButton>{'Compare Treatments'}</NavButton>
        <Spacer />
        <NavButton>{'Browse Studies'}</NavButton>
        <Spacer />
        <NavButton>{'Community'}</NavButton>

        <Spacer />
        <Box>
         { user === undefined ? 
          <Button 
            size="md"
            variant="black"
            border='1px solid white'
            onClick={() => {signInContext({'type': 'NewUser'})}}>Sign Up</Button> :
            <UserButton/> }
        </Box>
        </Hide>

        <Show below='sm'>
        <Flex alignItems='center' align='stretch' w='100%'>
          <Box w='65%' onClick={onLogoCLick}>
            <Image src='/black_and_white.svg' width={200} height={20}/>
          </Box>
          <Spacer />
         { user === undefined ? 
          <Button 
            size="md"
            variant="black"
            border='1px solid white'
            onClick={() => {signInContext({'type': 'NewUser'})}}>Sign Up</Button> :
            <UserButton /> }
          <Spacer />
          <HeaderDropdown options={['Compare Treatments', 'Browse Studies', 'Community']} />
        </Flex>
        </Show>

      </Flex>
    </Box>
  );
}
 
