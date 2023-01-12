import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';


let touchstartX = 0
let touchendX = 0
    

export default function SlideBody(props) {
	const { children, ...kv } = props;

	const router = useRouter();

	function onKeydown(e) {
		if (['ArrowRight', 'ArrowDown'].includes(e.code)) pageUp();
		if (['ArrowLeft', 'ArrowUp'].includes(e.code)) pageDown();
	}

	function checkDirection() {
	  if (touchendX < touchstartX) pageUp();
	  if (touchendX > touchstartX) pageDown();
	}

	function onTouchStart(e) {
		touchstartX = e.changedTouches[0].screenX;
	}

	function onTouchEnd(e) {
	  touchendX = e.changedTouches[0].screenX
	  checkDirection()
	}

	useEffect(() => {
		document.addEventListener('keydown', onKeydown);
		document.addEventListener('touchstart', onTouchStart);
		document.addEventListener('touchend', onTouchEnd);

		return () => {
			document.removeEventListener('keydown', onKeydown);
			document.removeEventListener('touchstart', onTouchStart);
			document.removeEventListener('touchend', onTouchEnd);
		}
	}, [])

	function pageUp() {
		if (!router.query.page) {
			router.query.page = '2' 
			router.push(router, undefined, { shallow: true });
			return;
		}

		router.query.page = ((parseInt(router.query.page) + 1) % 17).toString();
		router.push(router, undefined, { shallow: true });
	}

	function pageDown() {
		if (!router.query.page) {
			router.query.page = '1' 
			router.push(router, undefined, { shallow: true });
			return;
		}

		if (parseInt(router.query.page) <= 0) {
			router.query.page = '15'
			router.push(router, undefined, { shallow: true });
			return;
		}
		
		router.query.page = ((parseInt(router.query.page) - 1) % 17).toString();
		router.push(router, undefined, { shallow: true });
	}

	return (
		<Flex minH='85vh' {...kv}>
		{children}
		</Flex>
	);
}