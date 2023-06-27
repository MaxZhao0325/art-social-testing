// todo: xin
import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export default function TextInput({ selectedEmoji }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Update the input value whenever a new emoji is selected
  useEffect(() => {
    if (selectedEmoji) {
      setInputValue(inputValue + selectedEmoji);
    }
  }, [selectedEmoji]);

  return (
    <textarea
      style={{
        width: '60%',
        height: '200px',
        fontSize: '10px',
        paddingTop: '10px',
      }}
      value={inputValue}
      onChange={handleChange}
      placeholder='Schedule your social media posts with OneUp!'
    />
  );
}
