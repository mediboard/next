import { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalContent,
	ModalBody,
	Flex,
	Heading,
	Spacer,
	IconButton
} from '@chakra-ui/react';
import FilterIcon from './icons/FilterIcon';
import { ItemBadge } from './TreatmentCompareItem';
import { CloseIcon } from '@chakra-ui/icons';
import TreatmentCard from './TreatmentCard';


export default function TreatmentModal(props) {
	const { 
		conditionName,
		treatments,
		selectedTreatments,
		...kv } = props;

	const [showDialog, setShowDialog] = useState(false);

	return (
		<>
		<Flex p={5} borderRadius={50}
			bg='white'
			border='1px solid #cccccc'>
			<Flex w={[300,500]} flexWrap='wrap' alignItems='center'>
			{selectedTreatments?.map(treat => (
				<ItemBadge
					color='purpleHover.300'
					w='fit-content'
					textAlign='center'>
					{treat}
				</ItemBadge>
			))}
			</Flex>
			<IconButton bg='black' onClick={() => {setShowDialog(true)}} icon={<FilterIcon fill='white' />} />
		</Flex>

		<Modal
			size='2xl'
			isOpen={showDialog}>
	    <ModalOverlay />
	    <ModalContent>
		    <ModalHeader pb={2}>
		    	<Flex mb={1}>
		    		<Heading>{`Treatments for ${conditionName}`}</Heading>
		    		<Spacer />
			    	<IconButton 
			    		colorScheme={'purple'}
			    		onClick={() => {setShowDialog(false)}}
			    		icon={<CloseIcon />}/>
		    	</Flex>
	    	</ModalHeader>
	    	<ModalBody h='100%'>
					<Flex flexWrap='wrap' 
						maxH={500}
						overflow='scroll'
						justifyContent='center'
						columnGap={5} rowGap={5}
						p={10} w='100%' m={'2.5%'}>
					{treatments?.map(treat => (
						<TreatmentCard
							conditionGroup={conditionName} 
							treatment={treat}/>
					))}
					</Flex>
	    	</ModalBody>
	    </ModalContent>
		</Modal>
		</>
	)
}