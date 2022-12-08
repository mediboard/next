import Measure from './Measure';
import {
	Spacer,
	Flex,
} from '@chakra-ui/react';
import AttributeSummaryCard from './AttributeSummaryCard';
import StudySection from './StudySection';


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
			<StudySection header='Results Overview' mb={8}>
			<Flex>
				<Spacer />
				<AttributeSummaryCard
					shallow={true} text='See more results' color='purple.300' w='100%'
					href={`/studies/${studyId}/${title}/?section=results&result=${measure?.id}`}>
					{no_measures}
				</AttributeSummaryCard>
			</Flex>
			</StudySection>

			<Measure measureData={measure}
				groupData={groups?.filter(group => measure?.outcomes?.map(out => out.group)?.includes(group.id))} />
		</Flex>
	)
}