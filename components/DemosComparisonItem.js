import { useEffect, useState } from 'react';
import DemographicsHChart from './DemographicsHChart';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import {
	Box,
	Show,
	Hide
} from '@chakra-ui/react';

export default function DemosComparisonItem(props) {
	const { treatmentName, fill, ...kv } = props;

	const [demos, setDemos] = useState([]);
	const [demosIsLoading, setDemosIsLoading] = useState(true);

	useEffect(() => {
		if (treatmentName) {
			loadDemographicsData();
		}
	}, [treatmentName])

	async function loadDemographicsData() {
		setDemosIsLoading(true);
		treatmentHttpClient.getDemographics(treatmentName).then(data => {
			setDemos(data);
		}).catch((error)=>{
			console.log(error);
		}).finally(()=>{
			setDemosIsLoading(false);
		});
	};

	return (
		<Box w='100%'>
			<DemographicsHChart
				border={`2px solid ${fill}`}
				aspect={1}
				isLoading={demosIsLoading} 
				title={treatmentName}
				demos={demos}/>
		</Box>
	);
}
