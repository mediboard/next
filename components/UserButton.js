import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	Text,
	Box,
	Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Flex,
  Spacer
} from '@chakra-ui/react';
import { ExternalLinkIcon, ChevronDownIcon } from '@chakra-ui/icons';
import UserIcon from './icons/UserIcon';
import LogoutIcon from './icons/LogoutIcon';
import { useAuthenticator } from '@aws-amplify/ui-react';
import UserDisplayName from './UserDisplayName';
import PopoverOption from './PopoverOption';


export default function UserButton(props) {
	const { user, signOut } = useAuthenticator((context) => [context.user]);
	const [userAttributes, setUserAttributes] = useState({});

	const router = useRouter();

	function onSignOut() {
		signOut();
	}

	function onUserProfile() {
		router.push(`/users/${user?.username}`);
	}

	return (
		<Popover >
			<PopoverTrigger>
				<Flex
					alignItems='center'
					_hover={{
						cursor: 'pointer'
					}}>
					<UserIcon fill={'white'} h={[8,10]} w={[8,10]}/>
					<ChevronDownIcon w={[5,6]} h={[5,6]} color='white'/>
				</Flex>
			</PopoverTrigger>
		  <PopoverContent>
		    <PopoverArrow />
		    <PopoverCloseButton />
		    <PopoverHeader>
		    	<Flex direction='column' pt={4}>
		    		<Flex w='100%' alignItems='center' justifyContent='center'>
			    		<UserDisplayName
			    			flairOne={userAttributes?.userAttributesTagOneId}
			    			flairTwo={userAttributes?.userAttributesTagTwoId}
			    			username={user?.username} />
		    		</Flex>
		    	</Flex>
		    </PopoverHeader>
		    <PopoverBody>
		    	<PopoverOption pl={2} pr={2} onClick={onUserProfile}>
		    		<Text>User Profile</Text>
		    	</PopoverOption>

		    	<PopoverOption pl={2} pr={2} onClick={onSignOut}>
		    		<Flex alignItems='center'>
			    		<Text>Sign Out</Text>
			    		<Spacer />
			    		<ExternalLinkIcon />
		    		</Flex>
		    	</PopoverOption>
		    </PopoverBody>
		  </PopoverContent>
		</Popover>
	);
}