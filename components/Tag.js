import {
	Badge
} from '@chakra-ui/react';


export default function Tag(props) {
	const { color, children, ...sx } = props;

	return (
		<Badge 
			fontSize='12px'
			display='flex'
			colorScheme={color ?? 'gray'}
			{...sx}>
		{children}
		</Badge> 
	);
}