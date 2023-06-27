// todo: Hanzhang
import PreviewPanel from './PreviewPanel';
import TextInputPanel from './TextInputPanel';

import { Box, Flex } from '@chakra-ui/react';

export default function NewPostsLayout(props) {
  return (
    <Flex>
      <Box flex='1' p={4}>
        <TextInputPanel />
      </Box>
      <Box borderLeft='1px solid' borderColor='gray.200' />
      <Box flex='1' p={4}>
        <PreviewPanel />
      </Box>
    </Flex>
  );
}
