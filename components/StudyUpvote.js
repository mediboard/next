import UpvoteIcon from './icons/UpvoteIcon';
import {
	Flex,
	Text,
	Skeleton,
	Box
} from '@chakra-ui/react';


export default function StudyUpvote(props) {
	const { studyId, studyUpvotes, _version, ...kv } = props;

	return (
		<Flex justifyContent='center' alignItems='center'>
			<Box 
				mb='2px'
				mr='3px'
				_hover={{ cursor: 'pointer' }}>
				<UpvoteIcon h='16px' w='14px' isSelected={false}/>
			</Box>
			<Text fontSize='14px'>{0}</Text>
		</Flex>
	);
}