import {
	Flex,
	Text,
	LinkBox,
	Spacer,
	LinkOverlay
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';


export default function AttributeSummaryCard(props) {
	const { children, text, color, href, ...kv } = props;

	return (
		<LinkBox
			display='flex'
			gap={2}
			borderRadius={4}
			boxShadow='0px 0px 2px 2px rgba(0, 0, 0, 0.1)'
			p={1}
			pl={2}
			w='fit-content'
			alignItems='center'
			{...kv}>
			<LinkOverlay href={href || '#'}>
				<Text fontSize={['14px','16px']} fontWeight='500'>{text}</Text>
			</LinkOverlay>

			<Flex justifyContent='center' bg='white' p={1} pr={0} borderRadius={4} alignItems='center'>
				<Text fontSize={['18px','22px']} fontWeight='550' color={color}>{children}</Text>
			</Flex>
			<Spacer />
			<ChevronRightIcon color='#888888' w={6} h={7}/>
		</LinkBox>
	);
}
