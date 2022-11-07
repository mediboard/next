import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  ColorModeScript,
	Flex,
	Heading,
	Spacer
} from '@chakra-ui/react';
import StudiesLandingDeck from '../../components/StudiesLandingDeck';
import FeaturedStudiesDeck from '../../components/FeaturedStudiesDeck';
import StudySearchBar from '../../components/StudySearchBar';
import studyHttpClient from '../../services/clientapis/StudyHttpClient';
import { theme } from '../_app';


export async function getServerSideProps(context) {
	let params = {};

	if (context.params?.query) { params['q'] = context.params.query; }
	if (context.params?.conditions) { params['conditions'] = context.params.conditions; }
	if (context.params?.treatments) { params['treatments'] = context.params.treatments; }
	if (context.params?.gender) { params['gender'] = context.params.gender; }

	const studies = await studyHttpClient.search(context.params?.page || 1, params);

	const featuredStudies = await studyHttpClient.getBannerStudies();

	return {props: { 
		studies: studies?.studies,
		featuredStudies: featuredStudies?.studies
	}};
}

export default function StudyBrowse(props) {
	return (
		<>
			<Main {...props}/>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
		</>
	)
}

function Main(props) {
	return (
		<Flex direction={'column'} mb={'2.5%'} mt={'2.5%'} borderRadius={4} p={4} bg='white' w='100%' gap={5}>
			<Flex w='100%'>
				<Heading fontSize='18px'>{'Trending Studies: '}</Heading>
				<Spacer />
			</Flex>
			<FeaturedStudiesDeck studies={props.featuredStudies}/>

			<Flex flexDirection='column' w='100%' gap={5}>
				<StudySearchBar />
				<StudiesLandingDeck studies={props.studies}/>
			</Flex>
		</Flex>
	);
}