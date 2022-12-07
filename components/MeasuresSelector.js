import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Box,
	Flex,
	Spacer,
	Heading,
	VStack,
	Badge,
	IconButton,
	Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import MeasuresTile from './MeasuresTile';


export default function MeasuresSelector(props) {
	const { setSelectedMeasure, selectedMeasure, measures, ...kv } = props;

	const router = useRouter();
	const { result } = router.query;

	useEffect(() => {
		if (result && measures?.length) {
			setSelectedMeasure(measures?.filter(measure => measure.id == result)[0]);
		}
	}, [result, measures?.length])

	const [isOpen, setIsOpen] = useState(false);

	function selectMeasure(measureId) {
		router.query.result = measureId;
		router.push(router, undefined, { shallow: true });
		setIsOpen(false);
	}

	return (
		<>
		<Flex 
			w='100%' 
			boxShadow='2px 3px 4px 4px rgb(129, 133, 255, .3)'
			flexDirection='row'
			borderRadius={4}
			pl={5}
			border='1px solid #cccccc'>
				<Box p={2} mr={2} w={['80%', '93%']}>
					<Text fontWeight='600' textAlign='center'>{selectedMeasure?.title}</Text>
				</Box>

				<IconButton 
					h='auto'
					w={['20%', '7%']}
					bg='black'
					onClick={() => setIsOpen(true)} 
					icon={<ChevronDownIcon />} />
		</Flex>

		<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
			<ModalOverlay />
			<ModalContent >
				<ModalHeader>
					<Heading fontSize='20px'>{'Select Study Result'}</Heading>
					<ModalCloseButton />
				</ModalHeader>

				<ModalBody p={0}>
					<Flex alignItems='center' pl={5} pr={5} pb={3}>
						<Text fontWeight='500'>{'Priority'}</Text>
						<Spacer />
						<Badge colorScheme='purple' mr={3}>{'PRIMARY'}</Badge>
						<Badge colorScheme='green' mr={3}>{'SECONDARY'}</Badge>
						<Badge colorScheme='orange'>{'OTHER'}</Badge>
					</Flex>

					<VStack w='100%' maxH={'65vh'} 
						spacing={5} bg='gray.100'
						borderRadius={5}
						p={5}
						pt={7}
						overflow='scroll' 
						align='stretch'>
						{measures.map(measure => (
							<MeasuresTile key={measure.id} 
								measure={measure}
								_hover={{
									cursor: 'pointer'
								}}
								bg={selectedMeasure?.id === measure.id ? '#cccccc44' : 'white'}
								border={selectedMeasure?.id === measure.id ? '2px solid rgb(129, 133, 255)' : 'default'} 
								onClick={() => selectMeasure(measure.id)} /> 
						))}
					</VStack>
				</ModalBody>

			</ModalContent>
		</Modal>
		</>
	);
}