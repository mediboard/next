import { useState } from 'react';
import {
	Flex,
	Text,
	Button
} from '@chakra-ui/react'


export default function ExpandableDeck(props) {
	const { children, label, no_shown, ...kv } = props;

	const [isExpanded, setIsExpanded] = useState(false);

	const onClick = () => {
		setIsExpanded(!isExpanded);
	}

	return (
		<Flex flexWrap='wrap' w='100%' {...kv} alignItems='center'>
			{label}
			{isExpanded ? children : children?.slice(0, no_shown || 3)}
			<Text _hover={{cursor: 'pointer'}} 
				fontSize='13px'
				textAlign='center'
				color='black'
				display={children?.length > (no_shown || 3) ? 'default' : 'none'}
				onClick={onClick}>
				{isExpanded ? 'Show less' : `+${children?.slice((no_shown || 3))?.length} More`}
			</Text>
		</Flex>
	);
}