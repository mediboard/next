import Measure from './Measure';
import {
	Spacer,
	Flex,
} from '@chakra-ui/react';
import AttributeSummaryCard from './AttributeSummaryCard';


export default function MeasureOverview(props) {
	const { 
		groups,
		measure,
		no_measures, 
		studyId,
		title,
		...kv } = props

	return (
		<Flex flexDirection='column'>
			<Measure measureData={measure} 
				groupData={groups?.filter(group => measure?.outcomes?.map(out => out.group)?.includes(group.id))} />

			<Flex mt={8}>
				<Spacer />
				<AttributeSummaryCard
					shallow={true} text='See more results' color='purple.300'
					href={`/studies/${studyId}/${title}/?section=results&result=${measure?.id}`}>
					{no_measures}
				</AttributeSummaryCard>
			</Flex>
		</Flex>
	)
}