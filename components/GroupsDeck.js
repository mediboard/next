import GroupsCard from './GroupsCard';
import { 
	Flex,
	Box,
	SimpleGrid,
	Skeleton,
	Heading 
} from '@chakra-ui/react';


export default function GroupsDeck({
	isLoading,
	groups
}) {
	return(
		<Flex 
			w='100%'
			gap={5}
			flexDirection='column'>
			<SimpleGrid w='100%' spacing={5} columns={{sm: 2, md:2, lg:3}}>
			{isLoading ? 
				[1,2,3].map(x => (<Skeleton key={x} borderRadius={10} height={'400px'}/>)) 
				:
				groups.map((x, index) => (
					<Box key={'group-card-'+index}>
						<GroupsCard groupData={x} index={index}/>
					</Box>))
			}
			</SimpleGrid>
		</Flex>
	);
}
