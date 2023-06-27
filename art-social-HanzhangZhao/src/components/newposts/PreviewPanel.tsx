// todo: Gillian

import {
  IconButton,
  ButtonGroup,
  Avatar,
  HStack,
  VStack,
  Image,
  Box,
  Icon,
  Flex,
  Card,
  useBoolean,
  Spacer,
  Text,
  Container,
  AspectRatio,
  Divider,
} from '@chakra-ui/react';
import {
  BsLinkedin,
  BsTwitter,
  BsThreeDots,
  BsGlobeAmericas,
} from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { BiRepost, BiCommentDetail } from 'react-icons/bi';
import { IoPaperPlaneSharp } from 'react-icons/io5';
//import { Show, Hide } from '@chakra-ui/react'

export default function PreviewPanel(props) {
  //General Information
  const inputText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  const inputMedia =
    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9';
  const currentTime = '6:15 PM';
  const currentDate = 'Jun 17, 2023';

  // Twitter Information
  const twitterProfilePicture =
    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9';
  const twitterName = 'Justina Clark';
  const twitterUsername = '@jclark';

  // LinkedIn Information
  const linkedInProfilePicture =
    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9';
  const linkedInName = 'Justina Clark';
  const linkedInFollowerCount = '250';

  return (
    <VStack spacing='20px'>
      {/* Select which social media preview to view */}
      <ButtonGroup variant='outline' colorScheme='black'>
        <IconButton aria-label='Twitter' icon={<BsTwitter />} isRound={true} />

        <IconButton
          aria-label='LinkedIn'
          icon={<BsLinkedin />}
          isRound={true}
        />
      </ButtonGroup>

      {/* Twitter Post Preview */}
      <Card>
        <VStack align='left'>
          {/* User Information */}
          <HStack
            spacing='10px'
            paddingTop='20px'
            paddingLeft='20px'
            paddingRight='20px'
            paddingBottom='10px'
          >
            <Avatar name={twitterName} size='md' src={twitterProfilePicture} />
            <Box>
              <Text as='b'>{twitterName}</Text>
              <Text color='gray'>{twitterUsername}</Text>
            </Box>
            <Spacer />
            <Box alignSelf='right'>
              <Icon as={BsThreeDots} />
            </Box>
          </HStack>

          {/* Post Content */}
          <Container minWidth='40ch'>
            <VStack align='left'>
              <Text paddingBottom='15px'>{inputText}</Text>
            </VStack>
            <AspectRatio ratio={16 / 9}>
              <Image borderRadius='7%' src={inputMedia} />
            </AspectRatio>
          </Container>

          {/* Footer */}
          <Text color='gray' paddingLeft='20px' paddingBottom='15px'>
            {currentTime} · {currentDate}
          </Text>
        </VStack>
      </Card>

      {/* LinkedIn Post Preview */}
      <Card>
        <VStack align='left'>
          {/* User Information */}
          <HStack
            spacing='10px'
            paddingTop='20px'
            paddingLeft='20px'
            paddingRight='20px'
            paddingBottom='10px'
          >
            <Box boxSize='70px'>
              <Image src={linkedInProfilePicture} />
            </Box>
            <Box>
              <Text as='b'>{linkedInName}</Text>
              <Text fontSize='sm' color='gray'>
                {linkedInFollowerCount} followers
              </Text>
              <HStack>
                <Text color='gray' fontSize='sm'>
                  1d ·{' '}
                </Text>
                <Icon boxSize='15px' color='gray' as={BsGlobeAmericas} />
              </HStack>
            </Box>
            <Spacer />
            <Box alignSelf='right' verticalAlign='top'>
              <Icon boxSize='20px' as={BsThreeDots} />
            </Box>
          </HStack>

          {/* Post Content */}
          <Container minWidth='40ch'>
            <VStack align='left'>
              <Text fontSize='sm' paddingBottom='15px'>
                {inputText}
              </Text>
              <Image fit='cover' src={inputMedia} />
            </VStack>
          </Container>

          <Divider paddingTop='10px' />

          {/* Footer */}
          <Flex color='blackAlpha.700' padding='15px'>
            <HStack spacing='5px'>
              <Icon boxSize='25px' as={AiOutlineLike} />
              <Text>Like</Text>
            </HStack>
            <Spacer />
            <HStack>
              <Icon boxSize='25px' as={BiCommentDetail} />
              <Text>Comment</Text>
            </HStack>
            <Spacer />
            <HStack>
              <Icon boxSize='25px' as={BiRepost} />
              <Text>Repost</Text>
            </HStack>
            <Spacer />
            <HStack>
              <Icon boxSize='25px' as={IoPaperPlaneSharp} />
              <Text>Send</Text>
            </HStack>
          </Flex>
        </VStack>
      </Card>
    </VStack>
  );
}
