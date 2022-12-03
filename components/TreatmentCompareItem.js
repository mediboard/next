import {
	Flex,
	Text,
	Box,
	VStack,
	Spacer,
} from '@chakra-ui/react';



export function ItemBadge(props) {
	const { children, color, ...kv } = props;

	return (
		<Flex
			w='100%'
			pt={1}
			pb={1}
			pr={3}
			pl={3}
			borderRadius={12}
			bg={children ? color : 'grey'}
			{...kv}>
			<Text fontSize='14px' fontWeight='500'>{children || (<Flex columnGap={2} ml={2}><p>&#x1F6A7;</p> {'Under Construction'} <p>&#x1F6A7;</p></Flex>)}</Text>
		</Flex>
	)
}

export default function TreatmentCompareItem(props) {
	const {
		treatment,
		selectedTreatment,
		setSelectedTreatment,
		color,
		...kv
	} = props;

	return (
		<Flex flexDirection='column'
			minW='250px'
			p={4}
			borderRadius={4}
			onClick={() => {setSelectedTreatment(treatment)}}
			_hover={{
				cursor: 'pointer'
			}}
			border={'2px solid rgb(129, 133, 255)'}>
			<Flex w='100%'>
				<Text fontSize='18px' float='left' textAlign='left'>{treatment?.name || 'NAME'}</Text>
				<Spacer />
				<Box 
					minW={5} 
					float='right' 
					borderRadius={4}
					border={'2px solid rgb(129, 133, 255)'}
					h={5} 
					bg={selectedTreatment?.name == treatment?.name ? 'rgb(129, 133, 255)' : 'white'} />
			</Flex>
			<Box w='100%'>
				<Text
					fontSize='14px'
					fontWeight='400'
					float='left'>{`BRAND NAMES: ${treatment?.brandNames?.map(x => (x.toUpperCase() + ', ')) || ''}`}</Text>
			</Box>
			<Spacer />
			<VStack>
				<ItemBadge color={'rgb(129, 133, 255)'}>{!treatment?.no_studies ? treatment?.no_studies : treatment?.no_studies + ' STUDIES'}</ItemBadge>
				<ItemBadge color={'rgb(129, 133, 255)'}>{!treatment?.no_reviews ? treatment?.no_reviews : treatment?.no_reviews + ' REVIEWS'}</ItemBadge>
				<ItemBadge color={'rgb(129, 133, 255)'}>{treatment?.reviewScore}</ItemBadge>
			</VStack>
		</Flex>
	)
}