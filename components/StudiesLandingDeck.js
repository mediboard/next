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

	const router = useRouter();

	const { treatments, conditions, q, gender } = router.query;

	useEffect(() => {
		fetchStudiesFromQuery();
	}, [conditions, treatments, q])

	async function fetchStudiesFromQuery(hardRefresh=false) {
		const params = {
			'q': q,
			'conditions': conditions,
			'treatments': treatments,
			'gender': gender
		}

		studyHttpClient.search(1, params).then(data => {
			let studiesToAdd = data['studies'];
			setStudies(studiesToAdd);
		})
	}

	return (
		<Flex flexDirection='column'>
			<PageDeck p={0}>
			{studies?.map(x => (<StudyCard w={['100%', '100%']} key={x.id} {...x}/>))}
			</PageDeck>
		</Flex>
	)
}