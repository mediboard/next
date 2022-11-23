import { useSate } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
	ColorModeScript,
	Heading,
	Flex
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { theme } from '../_app';
import PageBody from '../../components/PageBody';
import TreatmentModal from '../../components/TreatmentModel';


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

function Main(props) {
	const router = useRouter();
  const { title, treatments } = router.query;

	return (
		<PageBody mt={0} align='center' justifyContent='center' bg='#E0E0E0'>
			<TreatmentModal
				conditionName={title}
				treatments={props.treatments}
				selectedTreatments={treatments.split(',')}/>
		</PageBody>
	);
}