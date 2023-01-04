import {
	useRadio,
	Box
} from '@chakra-ui/react';


export default function Radio(props) {
	const { radioProps, ...kv } = props;
  const { getInputProps, getCheckboxProps } = useRadio(radioProps)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

	return (
    <Box as='label' {...kv}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        textAlign='center'
        boxShadow='md'
        _checked={{
          bg: 'purple.300',
          color: 'white',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
	);
}