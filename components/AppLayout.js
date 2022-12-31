import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout(props) {
	const { children, ...kv } = props;

	const router = useRouter();

	return (
		<>
			{!router.pathname.includes('/demo') && <Header />}
			<main>{children}</main>
			{!router.pathname.includes('/demo') && <Footer />}
		</>
	)
}