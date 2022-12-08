import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  ColorModeScript,
	Flex,
	Heading,
	Spacer
} from '@chakra-ui/react';
import PageBody from '../../components/PageBody';
import StudiesLandingDeck from '../../components/StudiesLandingDeck';
import FeaturedStudiesDeck from '../../components/FeaturedStudiesDeck';
import StudySearchBar from '../../components/StudySearchBar';
import studyHttpClient from '../../services/clientapis/StudyHttpClient';
import { theme } from '../_app';


export async function getServerSideProps(context) {
	const featuredStudies = await studyHttpClient.getBannerStudies();

	return {props: { featuredStudies: featuredStudies?.studies }};
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
		<PageBody mt={0} bg='#CED4DB'>
			<Flex direction={'column'} m={['0', '2.5%']} borderRadius={4} p={[0, 10]} bg='white' w='100%' gap={5}>
				<Flex w='100%' pt={[5, 0]} pl={[5, 0]}>
					<Heading fontSize='18px'>{'Trending Studies: '}</Heading>
					<Spacer />
				</Flex>
				<FeaturedStudiesDeck studies={props.featuredStudies}/>

				<Flex flexDirection='column' w='100%' p={[5, 0]} gap={5}>
					<StudySearchBar />
					<StudiesLandingDeck />
				</Flex>
			</Flex>
		</PageBody>
	);
}