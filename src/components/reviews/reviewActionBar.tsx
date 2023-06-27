import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const ReviewActionBar = () => {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('newest');

  // Define your filter and sort logic here
  const handleFilterClick = (filter) => {
    setFilter(filter);
    // TODO: Apply filter to reviews
  };

  const handleSortSelection = (sort) => {
    setSort(sort);
    // TODO: Apply sort to reviews
  };

  return (
    <Box display='flex' alignItems='center'>
      <Button onClick={() => handleFilterClick('All')}>All</Button>
      <Button onClick={() => handleFilterClick('Replied')}>Replied</Button>
      <Button onClick={() => handleFilterClick("Haven't Replied")}>
        Haven't Replied
      </Button>
      <Button onClick={() => handleFilterClick('Favorited')}>Favorited</Button>

      <Menu>
        <MenuButton as={Button}>Sort</MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleSortSelection('newest')}>
            Sort by Newest
          </MenuItem>
          <MenuItem onClick={() => handleSortSelection('critical')}>
            Sort by Most Critical
          </MenuItem>
          <MenuItem onClick={() => handleSortSelection('favorable')}>
            Sort by Most Favorable
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ReviewActionBar;
