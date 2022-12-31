import Head from 'next/head';
import { useRouter } from 'next/router';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from './_app';
import SlideBody from '../components/slides/SlideBody';
import Title from '../components/slides/Title';


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

		</SlideBody>
	);
}