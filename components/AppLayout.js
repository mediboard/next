import Header from './Header';
import Footer from './Footer';

export default function AppLayout(props) {
	const { children, ...kv } = props;

	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	)
}