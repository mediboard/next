import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import studyHttpClient from '../services/clientapis/StudyHttpClient';
import { buildQueryString } from '../utils';
import { useAuthenticator } from '@aws-amplify/ui-react';


export default function SaveSearchButton(props) {
  const {children, name, shallow, ...kv} = props;
  const [searchIsSaving, setSearchIsSaving] = useState(false);

  const router = useRouter();

  const { user } = useAuthenticator((context) => [context.user]);

  function onClick(e) {
    setSearchIsSaving(true);
    const {page, limit, ...studyArgs} = router.query;

    studyHttpClient.createSearch({
      id: uuidv4(),
      name: name,
      search_string: buildQueryString(studyArgs),
      original_user: user.username
    }).then(data => {
      const newSearch = data['search'];
      router.push({
        pathname: router.pathname,
        query: { search: newSearch.id },
        shallow: shallow 
      });

    }).catch(error => {
      console.log(error);

    }).finally(() => {
      setSearchIsSaving(false);
    })
  }

  return (
    <Button 
      onClick={onClick}
      disabled={!user}
      isLoading={searchIsSaving}
      {...kv}>
    {children}
    </Button>
  )
}