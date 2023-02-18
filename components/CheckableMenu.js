import React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Checkbox,
} from '@chakra-ui/react';


const CheckableMenuItem = ({ label, isChecked, onToggle }) => {
  return (
    <MenuItem onClick={onToggle}>
      <Checkbox isChecked={isChecked} mr="2" />
      {label}
    </MenuItem>
  );
};


export default function CheckableMenu(props) {
  const { options, selectedOptions, onOptionToggle, ...kv } = props;

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button}>Select Options</MenuButton>
      <MenuList>
      {options.map((option) => (
        <CheckableMenuItem
          key={option.id}
          label={option.label}
          isChecked={selectedOptions.includes(option.id)}
          onToggle={() => onOptionToggle(option.id)} />
      ))}
      </MenuList>
    </Menu>
  );
};