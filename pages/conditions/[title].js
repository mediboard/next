import { useSate } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
	ColorModeScript,
	Heading,
	Text,
	Box,
	Flex
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { theme } from '../_app';
import PageBody from '../../components/PageBody';
import TreatmentModal from '../../components/TreatmentModel';
import ConditionEffects from '../../components/ConditionEffects';


export async function getServerSideProps(context) {
	const { title } = context.params;

	const treatRes = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/conditions/group/${title}/treatments`);
	const treatData = await treatRes.json();

	const groupRes = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/conditions/group/${title}`);
	const groupData = await groupRes.json();

	const noStudiesRes = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/conditions/group/${title}/no_studies`)
	const noStudiesData = await noStudiesRes.json();

	return { props: {
		treatments: [...treatData?.treatments].sort((a,b) => (b.no_studies - a.no_studies)),
		group: groupData?.group,
		noStudies: noStudiesData?.no_studies
	}};
}

// Treatments - preview
// Number of studies
// Adverse effects severtiy
// User comments


export default function Condition(props) {
	return (
    <>
      <Main {...props} />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
	)
}

const treatmentsColorWheel = [
  "#818BEE",
  "#002779",
  "#D65108"
];

function Main(props) {
	const router = useRouter();
  const { title, treatments } = router.query;

  const treatColorMap = () => {
  	const map = {};
  	treatments?.split(',')?.forEach((name,i) => {
  		map[name] = treatmentsColorWheel[i % treatmentsColorWheel.length];
  	});

  	return map;
  }

	return (
		<PageBody p={'2.5%'} mt={0} align='center' justifyContent='center' bg='#E0E0E0'>
			<Flex flexDirection='column' w='100%' rowGap={5}>
				<Box p={5} bg='white' borderRadius={10}>
					<Heading>{`Clinical Data for ${title}`}</Heading>
					<Text>{'Some summary for depression'}</Text>
				</Box>
				<TreatmentModal
					conditionName={title}
					treatments={props.treatments}
					selectedTreatments={treatments.split(',')}/>

				<Box p={5} bg='white' borderRadius={10}>
					<ConditionEffects 
						treatColorMap={treatColorMap()}
						treatmentNames={treatments.split(',')}/>
				</Box>
			</Flex>
		</PageBody>
	);
}