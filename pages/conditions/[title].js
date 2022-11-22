import { useRouter } from 'next/router';
import Head from 'next/head';
import {
	ColorModeScript,
	Heading,
	Flex
} from '@chakra-ui/react';
import { theme } from '../_app';
import PageBody from '../../components/PageBody';
import TreatmentCard from '../../components/TreatmentCard';


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
  const { title } = router.query;

	return (
		<PageBody mt={0} align='center' justifyContent='center' bg='#E0E0E0'>
			<Flex flexWrap='wrap' justifyContent='center' columnGap={5} rowGap={5} p={10} minH='90vh' w='100%' m={'2.5%'}>
			{props.treatments?.map(treat => (
				<TreatmentCard
					conditionGroup={title} 
					treatment={treat}/>
			))}
			</Flex>
		</PageBody>
	);
}