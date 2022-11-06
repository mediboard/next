import {
	Box
} from '@chakra-ui/react';


export default function PopoverOption(props) {
	const { name, children, onClick, ...kv } = props;

	return (
		<Box
			onClick={onClick}
			fontWeight={500}
			fontSize='16px'
			textAlign='left'
			borderRadius={4}
			_hover={{
				borderBottom: '1px solid black',
				cursor: 'pointer',
			}}
			{...kv}
		>
		{children}
		</Box>
	)
}