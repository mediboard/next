import { useState, useEffect } from 'react';
import { 
  ColorModeScript,
	Flex,
	Heading,
	Box,
	Spacer
} from '@chakra-ui/react';
import PageBody from '../../components/PageBody';
import StudiesLandingDeck from '../../components/StudiesLandingDeck';
import FeaturedStudiesDeck from '../../components/FeaturedStudiesDeck';
import StudiesTable from '../../components/StudiesTable';
import StudySearchBar from '../../components/StudySearchBar';
import studyHttpClient from '../../services/clientapis/StudyHttpClient';
import Header from '../../components/Header';
import { theme } from '../_app';

// export async function getStaticProps(context) {
// 	const featuredStudies = await studyHttpClient.getBannerStudies();

// 	return {props: { featuredStudies: featuredStudies?.studies }};
// }

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
		<Box h='100vh' display='flex' flexGrow='1' flexDirection='column'>
			<Header />
				{/*<FeaturedStudiesDeck studies={props.featuredStudies}/>*/}

{/*					<StudySearchBar />
					<StudiesLandingDeck />
*/}			
			<StudiesTable display='flex' 
				flexGrow='1' flexDirection='column' h='100%'/>
		</Box>
	);
}