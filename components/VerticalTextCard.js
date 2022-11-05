import { Heading, Flex, } from '@chakra-ui/react';
import Card from './Card';

const rgbaSelected = 'rgba(129, 133, 255, 1)';

export default function VerticalTextCard(props) {
	const {header, subHeader, color, isLoading, ...kv} = props;

	const textColor = color === 'purple' ? 'white' : rgbaSelected;
	const bgColor = color === 'purple' ? rgbaSelected : 'white';

	return (
		<Card 
			minWidth='200px'
			loading={isLoading || false}
			key={subHeader}
			bg={bgColor}
			h='100%'
			skStyles={{height: '100%'}}
			{...kv}>
			<Flex 
				w='100%'
				align='center'
				direction='column'>
				<Heading
					as='h2'
					color={textColor}>
					{header}
				</Heading>
			  <Heading textAlign='center' color={textColor} size='sm'>{subHeader}</Heading>
			</Flex>
		</Card>
	)
}