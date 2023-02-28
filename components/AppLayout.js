import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';


export default function AppLayout(props) {
	const { children, ...kv } = props;

	const router = useRouter();

	return (
		<div>
			<main>{children}</main>
		</div>
	)
}