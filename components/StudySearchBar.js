import { useRouter } from 'next/router';
import { useState } from 'react';
import {
	InputGroup,
	Text,
	InputLeftElement,
	IconButton,
	Input,
	Divider,
	Box,
	Show,
	Hide,
	Flex,
	Select as ChakraSelect
} from '@chakra-ui/react';
import StudyFilterModal from './StudyFilterModal';
import FilterIcon from './icons/FilterIcon';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';
import TreatmentMultiSelect from './TreatmentMultiSelect';
import ConditionMultiSelect from './ConditionMultiSelect';


export default function StudySearchBar(props) {
	const { ...kv } = props;
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [conditionNames, setConditionNames] = useState([]);
	const [treatmentNames, setTreatmentNames] = useState([]);
	const [query, setQuery] = useState(undefined);

	function onFilterClick() {
		setIsModalOpen(!isModalOpen);
	}

	return (
		<Flex alignItems={['center','stretch']}
			border='1px solid #cccccc'
			boxShadow='2px 3px 4px 4px rgb(129, 133, 255, .3)'
			pl={[5, 0]}
			pr={[5, 0]}
			borderRadius={'50px'}
			minH={20} {...kv}>
			<Hide below='md'>
			<InputGroup w='35%'>
				<Input h='100%' 
					borderRadius={'50px 0px 0px 50px'}
					placeholder={'Any text...'}
					borderRight='1px solid #cccccc'
					onChange={(e) => {setQuery(e.target.value);}}/>
			</InputGroup>

			<Flex alignItems='center' w='50%'>
				<Box w='100%'>
					<Text fontWeight='500'>{'Conditions'}</Text>
					<ConditionMultiSelect setConditionNames={setConditionNames} conditionNames={conditionNames}/>
				</Box>
				<Box h='100%' w='1px' bg='#cccccc'/>

				<Box w='100%'>
					<Text fontWeight='500'>{'Treatments'}</Text>
					<TreatmentMultiSelect setTreatmentNames={setTreatmentNames} treatmentNames={treatmentNames}/>
				</Box>
				<Box h='100%' w='1px' bg='#cccccc'/>
			</Flex>

			<Flex alignItems='center' w='15%'>
				<Box w='100%'>
					<Text fontWeight='500'>{'Genders'}</Text>
					<ChakraSelect w='100%' border='none' >
						<option>{'All'}</option>
						<option>{'Male'}</option>
						<option>{'Female'}</option>
					</ChakraSelect>
				</Box>
			</Flex>
			</Hide>

			<Show below='md'>
				<Box w='100%'>
					<Text fontWeight='500' fontSize='15px' ml={4} textAlign='left'>{'Conditions'}</Text>
					<ConditionMultiSelect w='100%' setConditionNames={setConditionNames} conditionNames={conditionNames}/>
				</Box>
				<IconButton bg='black' onClick={onFilterClick} icon={<FilterIcon fill='white' />} />

				<StudyFilterModal
					setSearchString={setQuery}
					setConditions={setConditionNames}
					setTreatments={setTreatmentNames}
					isOpen={isModalOpen} 
					onClose={() => setIsModalOpen(false)} />
			</Show>
		</Flex>
	);
}