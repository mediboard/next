import Head from 'next/head';
import { useRouter } from 'next/router';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from './_app';
import SlideBody from '../components/slides/SlideBody';
import Title from '../components/slides/Title';
import Team from '../components/slides/Team';
import SideEffects from '../components/slides/SideEffects';
import GenderSideEffects from '../components/slides/GenderSideEffects';
import Results from '../components/slides/Results';
import Problem from '../components/slides/Problem';
import Inspiration from '../components/slides/Inspiration';
import Platform from '../components/slides/Platform';
import Accessible from '../components/slides/Accessible';
import Transparent from '../components/slides/Transparent';
import Relevant from '../components/slides/Relevant';
import Data from '../components/slides/Data';
import Competition from '../components/slides/Competition';
import Partners from '../components/slides/Partners';
import Ask from '../components/slides/Ask';
import Timeline from '../components/slides/Timeline';


export default function Demo() {
	return (
    <>
      <Head>
        <title>{'The Medical Board'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
	)
}

function Main() {
	const router = useRouter();
	const { page } = router.query;
	
	return (
		<SlideBody p={10}>
		{ (page === '1' || !page) && <Title /> }
		{ (page === '2') && <Team /> }
		{ (page === '3') && <Problem /> }
		{ (page === '4') && <Inspiration /> }
		{ (page === '5') && <Platform /> }
		{ (page === '6') && <Accessible /> }
		{ (page === '7') && <Transparent /> }
		{ (page === '8') && <Relevant /> }
		{ (page === '9') && <SideEffects /> }
		{ (page === '10') && <GenderSideEffects /> }
		{ (page === '11') && <Results /> }
		{ (page === '12') && <Data /> }
		{ (page === '13') && <Competition /> }
		{ (page === '14') && <Partners /> }
		{ (page === '15') && <Ask /> }
		{ (page === '16') && <Timeline /> }
		</SlideBody>
	);
}