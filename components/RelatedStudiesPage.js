import { useState, useEffect } from 'react';
import {
	Flex,
} from '@chakra-ui/react';
import studyHttpClient from '../services/clientapis/StudyHttpClient';
import LoadMoreDeck from './LoadMoreDeck';
import SignInBlocker from './SignInBlocker'
import StudyCard from './StudyCard';


export default function RelatedStudiesPage(props) {
	const { studyId, ...kv } = props;

	const [studies, setStudies] = useState([]);
	const [studiesIsLoading, setStudiesIsLoading] = useState(true);
	const [nextPage, setNextPage] = useState(1);

	useEffect(() => {
		if (studyId) {
			setStudiesIsLoading(true);
			fetchRelatedStudies();
		}
	}, [studyId])

	function fetchRelatedStudies() {
		studyHttpClient.getRelatedStudies(studyId, nextPage).then(data => {
			setStudies(data?.studies);
			setNextPage(data?.next);
		}).catch(error => {
			console.log(error);
		}).finally(() => {
			setStudiesIsLoading(false);
		})
	}

	return (
		<Flex flexDirection='column'>
			<SignInBlocker text='Join the beta to view related studies'>
			<LoadMoreDeck
				showLoadMore={nextPage}
				onLoadMore={() => fetchRelatedStudies(false)}
				p={0}
				minH='80vh'
				isLoading={studiesIsLoading}>
			{studies?.map(x => (
				<StudyCard w={['100%', '100%']} key={x.id} {...x}/>
			))}
			</LoadMoreDeck>
			</SignInBlocker>
		</Flex>
	);
}