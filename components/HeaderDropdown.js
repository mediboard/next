import { useRouter } from 'next/router';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Text,
  Spacer
} from '@chakra-ui/react';
import { HamburgerIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { navNameToRoute } from './Header';
import { useAuthenticator } from '@aws-amplify/ui-react';


export default function HeaderDropdown(props) {
	const { options, ...kv} = props;
	const { user, signOut } = useAuthenticator((context) => [context.user]);

	const router = useRouter();

	function onOptionClick(e) {
    router.push(navNameToRoute[e.target.innerText]);
	}

	function onSignOut() {
		signOut();
	}

	return(
		<Menu>
		  <MenuButton
		    as={IconButton}
		    bg='white'
		    aria-label='Options'
		    icon={<HamburgerIcon />}
		    variant='outline' {...kv}/>
		  <MenuList>
			  <MenuItem onClick={onSignOut} display={user ? 'default' : 'none'}>
	    		<Flex alignItems='center' w='100%'>
		    		Sign Out
		    		<Spacer />
		    		<ExternalLinkIcon />
	    		</Flex>
			  </MenuItem>
		  {options.map(option => (
		  	<MenuItem onClick={onOptionClick}>
		  	{option}
		  	</MenuItem>
	  	))}
		  </MenuList>
		</Menu>
	);
}