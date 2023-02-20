import { useState } from "react";
import { useRouter } from 'next/router';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input
} from "@chakra-ui/react";


const StringBody = ({value, setValue}) => (
  <Input 
    placeholder="search string"
    value={value}
    onChange={(e) => setValue(e.target.value)}/>
)


export default function FilterModal(props) {
  const { type, name, columnId, ...kv } = props;
  // Type: Date, String, Values

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [stringValue, setStringValue] = useState('');

  // Set the value in the url on close 

  function setStringUrl() {
    router.query[columnId] = stringValue;

    router.push({
      pathname: router.pathname,
      query: router.query 
    })
  }

  function onClose() {
    switch (type) {
    case 'String':
      setStringUrl();
      break;
    }

    setIsOpen(false);
  }

  return (
    <>
    <Button onClick={() => setIsOpen(!isOpen)}>{'Filter'}</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {(type === 'String') && <StringBody setValue={setStringValue} value={stringValue}/>}
          <Button onClick={onClose}>{'Search'}</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
};