import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import {
  Flex,
  Button,
  Input
} from '@chakra-ui/react';
import studyHttpClient from '../services/clientapis/StudyHttpClient';


export default function CurrentSearchCard(props) {
  const { search, setSearch, isEdited, ...kv } = props;

  const [seachName, setSearchName] = useState(undefined);
  const [searchIsSaving, setSearchIsSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (search?.name?.length) {
      console.log("riting")
      setSearchName(search.name);
    }
  }, [search?.name])

  function createSearch() {
    studyHttpClient.createSearch({
      id: uuidv4(),
      name: seachName,
      ...search
    }).then(data => {
      setSearch(search);

    }).finally(() => {
      setSearchIsSaving(true)
    })
  }

  function updateSearch() {
    studyHttpClient.updateSearch({
      ...search,
      name: seachName
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setSearchIsSaving(true);
    })
  }

  function onClick() {
    if (router?.query?.search) {
      updateSearch();
      return
    }

    createSearch();
  }

  return (
    <Flex>
      <Input 
        onChange={(e) => setSearchName(e.target.value)}
        placeholder='untitled' 
        value={seachName || ''} />
      <Button onClick={onClick}>
      {"Save Search"}
      </Button>
    </Flex>
  )
}