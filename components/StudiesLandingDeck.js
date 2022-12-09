import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
	Flex,
} from '@chakra-ui/react';
import PageDeck from './PageDeck';
import StudyCard from './StudyCard';
import studyHttpClient from '../services/clientapis/StudyHttpClient';


export default function StudiesLandingDeck() {
	const [studies, setStudies] = useState([]);
	const [noPages, setNoPages] = useState(undefined);

	const router = useRouter();

	const { treatments, conditions, q, gender, page } = router.query;

	useEffect(() => {
		fetchStudiesFromQuery();
	}, [conditions, treatments, q, page])

	async function fetchStudiesFromQuery(hardRefresh=false) {
		const params = {
			'q': q,
			'conditions': conditions,
			'treatments': treatments,
			'gender': gender,
		}

		studyHttpClient.search(page || 1, params).then(data => {
			let studiesToAdd = data['studies'];

			setStudies(studiesToAdd);
			setNoPages(Math.ceil(data['total'] / 10))
		})
	}

	function onPageClick(page) {
		router.query.page = page;
		router.push(router, undefined, { shallow: true });
	}

	return (
		<Flex flexDirection='column'>
			<PageDeck p={0} no_pages={noPages} page_no={parseInt(page) || 1} onPageClick={onPageClick}>
			{studies?.map(x => (<StudyCard w={['100%', '100%']} key={x.id} {...x}/>))}
			</PageDeck>
		</Flex>
	)
}