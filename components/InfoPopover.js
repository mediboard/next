import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  IconButton
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';


export default function InfoPopover(props) {
	const { header, children, footer, color, ...kv } = props;

	return (
		<Popover>
		  <PopoverTrigger>
		    <IconButton icon={<InfoIcon color={color} />} bg='clear' {...kv}/>
		  </PopoverTrigger>
	    <PopoverContent>
	      <PopoverArrow />
	      <PopoverHeader>{header}</PopoverHeader>
	      <PopoverCloseButton />
	      <PopoverBody>
	      {children}
	      </PopoverBody>
	    </PopoverContent>
		</Popover>
	)
}