import { useState } from 'react';
import {
  Input,
  InputRightElement,
  InputGroup,
  Flex,
  Text,
  IconButton
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { copyToClipboard } from '../utils';


export default function CopyText(props) {
  const { children, ...kv } = props;
  const [copied, setCopied] = useState(false);

  function onCopyClick() {
    copyToClipboard(children);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <Flex {...kv}>
      <InputGroup>
        <Input isReadOnly
          w='100%' 
          value={children} />
        <InputRightElement>
          {copied ? (
            <Text mr={2} fontSize='sm' color='gray.500'>
              Copied!
            </Text>
          ) : (
            <IconButton
              title='Copy Key Value'
              icon={<CopyIcon />}
              onClick={onCopyClick} />
          )}
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}