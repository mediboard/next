import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';


export default function SlideBody(props) {
	const { children, ...kv } = props;

	const router = useRouter();

	function onKeydown(e) {
		if (['ArrowRight', 'ArrowDown'].includes(e.code)) pageUp();
		if (['ArrowLeft', 'ArrowUp'].includes(e.code)) pageDown();
	}

	useEffect(() => {
		document.addEventListener('keydown', onKeydown);

		return () => {
			document.removeEventListener('keydown', onKeydown);
		}
	}, [])

	function pageUp() {
		if (!router.query.page) {
			router.query.page = '2' 
			router.push(router, undefined, { shallow: true });
			return;
		}

		router.query.page = (parseInt(router.query.page) + 1).toString();
		router.push(router, undefined, { shallow: true });
	}

	function pageDown() {
		if (!router.query.page) {
			router.query.page = '1' 
			router.push(router, undefined, { shallow: true });
			return;
		}
		
		router.query.page = (parseInt(router.query.page) - 1).toString();
		router.push(router, undefined, { shallow: true });
	}

	return (
		<Flex minH='85vh' {...kv}>
		{children}
		</Flex>
	);
}