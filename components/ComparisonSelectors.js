import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	Flex,
	Box,
	Text,
	Heading,
	Menu,
	MenuList,
  MenuItem,
  Button,
  MenuButton,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import conditionsHttpClient from '../services/clientapis/ConditionsHttpClient';


const treatmentsColorWheel = [
	'#ffbc80', 
	'#8185FF', 
	'#80c3ff', 
	'#bc80ff', 
	'#fb80ff'
];

export default function ComparisonSelectors(props) {
	const {
		conditionName,
		setSelectedTreatments,
		selectedTreatments,
		...kv } = props;

	const [treatments, setTreatments] = useState([]);
	const [treatmentsIsLoading, setTreatmentsIsLoading] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (conditionName) {
			loadTreatmentsData(conditionName);
		}
	}, [conditionName])

	useEffect(() => {
		if (treatments != null) {
			setSelectedTreatments(treatments?.filter(x => location.search?.includes(x.name?.replaceAll(' ', '+')))
				.map((x,i) => ({...x, fill: treatmentsColorWheel[i % treatmentsColorWheel.length]})));
		}
	}, [router.query.treatments, treatments?.length])

	function addTreatments(treatmentNames) {
		router.query.treatments = [...(router.query.treatments?.split(',') || []), ...treatmentNames]?.join(',');
		router.push(router, undefined, { shallow: true });
	}

	function removeTreatment(treatmentName) {
		router.query.treatments = router.query.treatments?.split(',')?.filter(x => x !== treatmentName).join(',');
		router.push(router, undefined, { shallow: true });
	}

	async function loadTreatmentsData(conditionName) {
		setTreatmentsIsLoading(true);
		conditionsHttpClient.getTreatments(conditionName).then(data => {
			setTreatments(data);
			if (!location?.search) {
				addTreatments([data[0]?.name, data[1]?.name]);
			}

		}).catch((error)=>{
			console.log(error);

		}).finally(()=>{
			setTreatmentsIsLoading(false);
		});
	}

	function onClick(treatmentName) {
		if (router.query.treatments?.includes(treatmentName?.replaceAll(' ', '+'))) {
			removeTreatment(treatmentName);
			return;
		}

		if (selectedTreatments?.length < 3) {
			addTreatments([treatmentName]);
		}
	}

	return (
		<Flex pb={6} columnGap={3} rowGap={3} justifyContent='center' flexWrap='wrap'>
		{treatments.slice(0,7)?.map(treatment => (
			<Flex key={treatment.id + '-compare'}
				pl={3}
				pr={3}
				onClick={() => {onClick(treatment.name)}}
				borderRadius={10}
				align='center'
				_hover={{
					cursor: (selectedTreatments?.length >= 3 && !router.query.treatments?.includes(treatment.name)) ? 'not-allowed' : 'pointer'
				}}
				bg={router.query.treatments?.includes(treatment.name?.replaceAll(' ', '+'))
					&& '#cccccc'}
				border={router.query.treatments?.includes(treatment.name?.replaceAll(' ', '+'))
					? '2px solid var(--chakra-colors-purple-300)' : '1px solid #cccccc'}>
				<Text fontSize={['12px','14px']}>{treatment.name}</Text>
			</Flex>
		))}
			<Menu>
			  <MenuButton as={Button} borderRadius={10} rightIcon={<ChevronDownIcon />}>
			  More 
			  </MenuButton>
			  <MenuList zIndex={5}>
			  {treatments.slice(7)?.map(treatment => (
			  	<MenuItem
						onClick={() => {onClick(treatment.name)}}
						_hover={{cursor: 'pointer'}}
			  		key={treatment.id+'-menu-item'}>
			  	{treatment?.name}
			  	</MenuItem>
		  	))}
			  </MenuList>
			</Menu>
		</Flex>
	);
}