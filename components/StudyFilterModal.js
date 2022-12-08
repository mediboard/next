import { useRouter } from 'next/router';
import { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Heading,
	Flex,
	Box,
	Input,
	Text,
	Select as ChakraSelect
} from '@chakra-ui/react'
import TreatmentMultiSelect from './TreatmentMultiSelect';
import ConditionMultiSelect from './ConditionMultiSelect';


export default function StudyFilterModal(props) {
	const { 
		setConditions,
		isOpen,
		onClose,
		...kv } = props;

	const router = useRouter();

	const [internalTreatments, setInternalTreatments] = useState([]);
	const [internalConditions, setInternalConditions] = useState([]);
	const [internalGender, setInternalGender] = useState([]);
	const [internalSearchString, setInternalSearchString] = useState(undefined);

	function onChange(e) {
		const text = e.target.value;
		setInternalSearchString(text);
	}

	function onSearch() {
		setConditions(internalConditions);

		const treats = internalTreatments.join(',');
		const conditions = internalConditions.join(',');

		router.push(`/studies/browse/?treatments=${treats}&conditions=${conditions}&q=${internalSearchString || ''}`, undefined, { shallow: true });

		onClose();
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<Heading fontSize='20px'>{'Filter Search'}</Heading>
					<ModalCloseButton />
				</ModalHeader>

				<ModalBody>
					<Flex flexDirection='column' gap={5}>
						<Input minH={12} 
							borderRadius={'50px'}
							placeholder={'Any text...'}
							onChange={onChange}/>

						<Box w='100%'>
							<Text fontWeight='500' mb={2} fontSize='16px'>{'Conditions'}</Text>
							<ConditionMultiSelect 
								borderRadius={'50px'}
								border='1px solid #cccccc'
								setConditionNames={setInternalConditions} 
								conditionNames={internalConditions}/>
						</Box>

						<Box w='100%'>
							<Text fontWeight='500' mb={2} fontSize='16px'>{'Treatments'}</Text>
							<TreatmentMultiSelect 
								borderRadius={'50px'}
								border='1px solid #cccccc'
								setTreatmentNames={setInternalTreatments} 
								treatmentNames={internalTreatments}/>
						</Box>

						<Box w='100%'>
							<Text fontWeight='500' mb={2} fontSize='16px'>{'Genders'}</Text>
							<ChakraSelect w='100%' border='1px solid #cccccc' borderRadius='50px' >
								<option>{'All'}</option>
								<option>{'Male'}</option>
								<option>{'Female'}</option>
							</ChakraSelect>
						</Box>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<Button onClick={onSearch}>{'Search Studies'}</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}