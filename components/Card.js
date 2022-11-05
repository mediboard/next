import { React } from 'react';
import { Box, useStyleConfig, Skeleton } from '@chakra-ui/react';


export default function Card(props) {
	const { variant, children, loading, skStyles, ...kv } = props;

	const styles = useStyleConfig('Card', { variant });

	return (
		<Skeleton isLoaded={!loading} {...skStyles}>
			<Box __css={styles} {...kv}>
				{children}
			</Box>
		</Skeleton>
	);
}