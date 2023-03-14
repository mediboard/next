import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import {
  Flex,
  IconButton,
  Heading,
  Text,
  Button,
  Input
} from '@chakra-ui/react';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';
import SaveIcon from './icons/SaveIcon';
import studyHttpClient from '../services/clientapis/StudyHttpClient';


export default function CurrentSearchCard(props) {
  const { search, setSearch, isEdited, ...kv } = props;

  const [seachName, setSearchName] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
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
      setSearch(data.search);

    }).finally(() => {
      setSearchIsSaving(false)
    })
  }

  function updateSearch() {
    studyHttpClient.updateSearch({
      ...search,
      name: seachName
    }).then(data => {
      setSearch(data.search);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setSearchIsSaving(false);
    })
  }

  function onClick() {
    setSearchIsSaving(true);
    if (router?.query?.search) {
      updateSearch();
    } else {
      createSearch();
    }

    setEditMode(!editMode);
  }

  function onClear() {
    router.push('/studies/browse');
  }

  return (
    <Flex alignItems='center' {...kv}>
    {editMode ? 
      <>
        <Input 
          onChange={(e) => setSearchName(e.target.value)}
          placeholder='untitled' 
          w='70%'
          textAlign='center'
          value={seachName || ''} />
        <IconButton bg='clear' color='gray.500'
          onClick={onClick} icon={<SaveIcon />}/>
        <IconButton bg='clear' color='gray.500'
          onClick={()=>{setEditMode(!editMode)}} icon={<CloseIcon />}/>
      </> :
      ((router?.query?.search) && <>
        <Text fontWeight='500' fontSize='18px'>{search?.name}</Text>
        <IconButton bg='clear' color='gray.500'
          onClick={()=>{setEditMode(!editMode)}} icon={<EditIcon />}/>
        <IconButton bg='clear' color='gray.500'
          onClick={onClear} icon={<CloseIcon />}/>
      </>)
    }
    </Flex>
  )
}