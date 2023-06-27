import { StarIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Box, Button, Stack, Tag, Text } from '@chakra-ui/react';
import React from 'react';

interface reviewItem {
  rating: number;
  userName: string;
  userBio: string;
  reviewText: string;
  postTime: Date;
  avatarLink: string;
  reviewStateTag: string;
}

const dummyReview = {
  rating: 4,
  userName: 'dummyUserName',
  userBio: 'dummy user bio text',
  reviewText:
    'This is the review item text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  postTime: new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  avatarLink: 'https:image/link/required',
  reviewStateTag: 'Replied',
};

const ReviewItem = () => {
  return (
    <Box display='flex' alignItems='flex-start'>
      <Stack spacing={3} flex={1} direction='column'>
        <Box display='flex' flexDirection='row' ml='2'>
          <Avatar src={dummyReview.avatarLink} size='lg'></Avatar>
          <Box flex={1} display='flex' flexDirection='column' ml='3'>
            <Text>{dummyReview.userName}</Text>
            <Text>{dummyReview.userBio}</Text>
          </Box>
        </Box>
        <Stack direction='row' spacing={3}>
          <Box flexDirection='row' mt='-0.5'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < dummyReview.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
          </Box>
          <p>{dummyReview.postTime}</p>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            {dummyReview.reviewStateTag}
          </Badge>
        </Stack>

        <Box flex={3}>
          <Text>{dummyReview.reviewText}</Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default ReviewItem;
