import { useState, useEffect } from 'react';
import { 
	Box, 
	Text, 
	Badge,
	VStack,
	HStack,
	Flex,
	Heading, 
	IconButton,
	Divider } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Card from './Card';
import studyHttpClient from '../services/clientapis/StudyHttpClient';
import TreatmentSelect from './TreatmentSelect';
import { isAdminUser } from '../utils';
import InfoPopover from './InfoPopover';


function TreatmentCard(props) {
	const { treatment, onCloseClick, bg, ...kv } = props;

	return (
		<Flex>
			<Flex
				w='100%'
				pl={3}
				pr={3}
				pt={1}
				pb={1}
				bg={bg || 'purple.300'}
				borderRadius={10}
				alignItems='center'
				justifyContent='center'>
				<Text color='white'>{treatment?.name}</Text>
			</Flex>
			<IconButton
				display={onCloseClick ? 'default' : 'none'}
				borderRadius={10}
				onClick={onCloseClick}
				bg='clear'
				icon={<CloseIcon color='purple.300' />} />
		</Flex>
	);
}


export default function GroupsCard({groupData, index}) {
	const [currentTreatments, setCurrentTreatments] = useState([]);
  const { user } = useAuthenticator((context) => [context.user]);

	useEffect(() => {
		if (groupData?.administrations?.length > 0) {
			setCurrentTreatments(groupData?.administrations);
		}
	}, [groupData?.administrations?.length])

	function onCloseClick(admin_id) {
		studyHttpClient.deleteAdmin(admin_id).then(data => {
			setCurrentTreatments(currentTreatments.filter(x => x.admin_id !== admin_id))
		});
	}

	function onSelect(treatment) {
		studyHttpClient.addAdmin({
			treatment: treatment?.id,
			group: groupData?.id,
      annotated: true,
			description: ''
		}).then(data => {
			const newAdmin = data?.admin;
			setCurrentTreatments([...currentTreatments, { admin_id:newAdmin?.id, ...treatment}])
		})
	}

	return (
		<Card 
			w='100%'
			p={['8px', '20px']}
			h='100%'
			skStyles={{'height': '100%'}}
			gap={0}
			flexDirection='column'
			border={'4px solid '+groupData.color} 
			overflowWrap='breakWord'>
{/*      <Flex 
        bg={groupData.color}
        w={10}
        h={10}
        alignItems='center'
        justifyContent='center'
        borderRadius='50%'>
        <Text
        	fontWeight='600'
        	fontSize='18px'
        	color='white'>
        	{index + 1}
        </Text>
      </Flex>
*/}		
			<Flex alignItems='center'>
				<Text
					w='100%'
					mt='6px'
	      	textAlign='center'
					fontWeight='500'
					fontSize='14px'
					mb={3}
					whiteSpace='normal'>{groupData.title}</Text>
					<InfoPopover color={groupData.color} header={groupData.title}>
						<Text>{groupData.description}</Text>
					</InfoPopover>
			</Flex>
			<Flex gap={2} flexWrap='wrap' justifyContent='center' w='100%'>
			{currentTreatments.map(x => (
				<TreatmentCard key={x.id}
					treatment={x}
					bg={groupData.color}
					onCloseClick={isAdminUser(user?.username) ? () => onCloseClick(x.admin_id) : undefined}/>
			))}
			{	isAdminUser(user?.username) && <TreatmentSelect w='100%' setSelectedTreatment={onSelect} /> }
			</Flex>
			{/*<Text whiteSpace='normal' fontWeight='400'>{groupData.description}</Text>*/}
		</Card>
	);
}