import {
	Text,
	Badge,
	HStack
} from '@chakra-ui/react';
import Tag from './Tag';
import TagService from '../services/TagService';
import { getNameFromTag } from '../utils';


export default function UserDisplayName({
	username,
	flairOne,
	flairTwo
}) {

	return (
		<HStack spacing={1}>
			<Text 
				textDecoration='underline'
				textAlign='left'>{username}</Text>
			{[flairOne, flairTwo].filter(x => x != null).map(x => (
				<Tag bg={TagService.getTagColor(x) + '99'}>{getNameFromTag(x)}</Tag>
			))}
		</HStack>
	)
}