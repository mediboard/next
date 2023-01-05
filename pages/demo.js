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
		{ (page === '0' || !page) && <Title /> }
		{ (page === '1') && <Team /> }
		{ (page === '2') && <Problem /> }
		{ (page === '3') && <Inspiration /> }
		{ (page === '4') && <Platform /> }
		{ (page === '5') && <Accessible /> }
		{ (page === '6') && <Transparent /> }
		{ (page === '7') && <Relevant /> }
		{ (page === '8') && <SideEffects /> }
		{ (page === '9') && <GenderSideEffects /> }
		{ (page === '10') && <Results /> }
		{ (page === '11') && <Data /> }
		{ (page === '12') && <Competition /> }
		{ (page === '13') && <Partners /> }
		{ (page === '14') && <Ask /> }
		{ (page === '15') && <Timeline /> }
		</SlideBody>
	);
}