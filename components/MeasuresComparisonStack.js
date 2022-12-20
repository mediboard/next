import { useState, useEffect } from 'react';
import {
	Flex,
	Box,
	Text
} from '@chakra-ui/react';
import MeasuresDeck from './MeasuresDeck';


export default function MeasuresComparisonStack(props) {
	const {
		treatments,
		condition,
		colGap,
		...kv
	} = props;

	return(
		<Box w='100%' 
			display='grid'
			gridAutoFlow='column'
			gridAutoColumns='1fr'
			gridGap={colGap}>
			<MeasuresDeck
				treatments={treatments} 
				conditionId={condition?.id}/>
		</Box>
	)
}