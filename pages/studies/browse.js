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
import StudiesTable from '../../components/StudiesTable';
import StudySearchBar from '../../components/StudySearchBar';
import studyHttpClient from '../../services/clientapis/StudyHttpClient';
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
		<PageBody mt={0} bg='#CED4DB'>
			<Flex direction={'column'} m={0} borderRadius={4} bg='white' w='100%' gap={5}>
				{/*<FeaturedStudiesDeck studies={props.featuredStudies}/>*/}

				<Flex flexDirection='column' w='100%' p={[5, 0]} gap={5}>
{/*					<StudySearchBar />
					<StudiesLandingDeck />
*/}			
					<StudiesTable />
				</Flex>
			</Flex>
		</PageBody>
	);
}