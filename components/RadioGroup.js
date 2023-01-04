import {
	HStack,
	useRadioGroup
} from '@chakra-ui/react';
import Radio from './Radio';


export default function RadioGroup({
	options,
	name,
	defaultValue,
	onChange
}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue: defaultValue,
    onChange: onChange 
  })

  const group = getRootProps()

  return (
    <HStack {...group} w='100%'>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <Radio 
          	key={value} 
          	radioProps={radio} 
          	w={Math.round(100 / options?.length).toString() + '%'}>
            {value}
          </Radio>
        )
      })}
    </HStack>
  )	
}