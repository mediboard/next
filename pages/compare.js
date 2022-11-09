import Link from 'next/link';
import {
	ColorModeScript,
	Button,
	Text,
	Box
} from '@chakra-ui/react';
import { theme } from './_app';
import WaitlistPage from '../components/WaitlistPage';


export default function ComparePage() {
	return (
		<>
			<Main />
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		</>
	)
}

export function Main() {
	return (
		<WaitlistPage bg='#CED4DB' mt={0}>
			<Text>{"We are opening up the ability to Compare Treatments on a rolling basis. Please sign up for the Beta to let us know you're interested."} </Text>
			<Box mt={5}>
				<Link href="/" passHref legacyBehavior>
					<Button>{'Join Our Beta'}</Button>
				</Link>
			</Box>
		</WaitlistPage>
	)
}