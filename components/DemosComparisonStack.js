import { useEffect, useState } from 'react';
import {
	Flex,
	Box
} from '@chakra-ui/react';
import DemosComparisonItem from './DemosComparisonItem';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';


export default function DemosComparisonStack(props) {
	const { treatments, colGap, ...kv } = props;

	const [demoGroups, setDemoGroups] = useState([]);

	useEffect(() => {
		if (treatments) {
			setDemoGroups(Promise.all(treatments.map(async treat => await loadDemographicsData(treat.name))))
		}
	}, [JSON.stringify(treatments)])

	async function loadDemographicsData(treatmentName) {
		return await treatmentHttpClient.getDemographics(treatmentName);
	}

	return (
		<Box w='100%'
			display='grid'
			gridAutoFlow={['row', 'column']}
			gridAutoColumns='1fr'
			gridGap={2}>
			{treatments?.map(treat => (
				<Box key={treat.id+'-demo-item'}>
					<DemosComparisonItem treatmentName={treat.name} fill={treat.fill}/>
				</Box>
			))}
		</Box>
	);
}