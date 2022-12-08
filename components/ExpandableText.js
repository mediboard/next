import { Box, Button, Text } from '@chakra-ui/react';
import { forwardRef, useState, useEffect, useRef } from 'react';


export const ExpandableText = forwardRef(({ children, noOfLines, ...rest }, ref) => {
	const [expandedCount, setExpandedCount] = useState(noOfLines);

	const [isClicked, setIsClicked] = useState(false);
	const [isTextClamped, setIsTextClamped] = useState(false);

	const handleToggle = () => {
		setIsClicked(true);
		setExpandedCount(expandedCount ? undefined : noOfLines);
	};

	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			setIsTextClamped((inputRef.current?.scrollHeight > inputRef.current?.clientHeight) || isClicked)
		}
	}, [inputRef])

	return (
		<Box ref={ref} {...rest}>
			<Box ref={inputRef} noOfLines={expandedCount}>
				{children}
			</Box>
			<Button
				size="sm"
				variant="link"
				onClick={handleToggle}>
				<Text>{!expandedCount ? 'Show less' : 'Read more'}</Text>
			</Button>
		</Box>
	);
	}
);

ExpandableText.displayName = 'ExpandableText';