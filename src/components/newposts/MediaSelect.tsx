/* eslint-disable @typescript-eslint/no-empty-function */
// todo: Yichi
import { Box } from '@chakra-ui/react';
import { Button, Image, Input } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlineFileGif } from 'react-icons/ai';
import { BiHappyAlt, BiImageAdd, BiText, BiVideo } from 'react-icons/bi';
import { MdOutlinePermMedia } from 'react-icons/md';

import { EmojiSrc } from '@/components/newposts/EmojiSrc';

const MediaSelect = ({ onEmojiSelect }) => {
  const [activeUpload, setActiveUpload] = useState<string | null>(null);

  const handleEmojiSelect = useCallback((emoji: string | null) => {
    onEmojiSelect(emoji);
  }, []);
  return (
    <Box>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* This is declaring different type of media select, it will allow user to submit different type of file according to the icon they clicked */}

        <label htmlFor='image-upload' onClick={() => setActiveUpload('image')}>
          <BiImageAdd size={35} />
        </label>

        <label htmlFor='video-upload' onClick={() => setActiveUpload('video')}>
          <BiVideo size={35} />
        </label>

        <label htmlFor='gif-upload' onClick={() => setActiveUpload('gif')}>
          <AiOutlineFileGif size={35} />
          {/*Those icon below this line is not implemented yet. Only images and videos allowed to submit currently */}
        </label>

        <BiText size={35} />

        <label htmlFor='emoji-upload' onClick={() => setActiveUpload('emoji')}>
          <BiHappyAlt size={35} />
        </label>

        <MdOutlinePermMedia size={35} />
      </div>

      <div
        style={{
          width: '60%',
          height: '60%',
        }}
      >
        {activeUpload === 'image' && (
          <FileUpload type='image' id='image-upload' onEmojiSelect={() => {}} />
        )}
        {activeUpload === 'video' && (
          <FileUpload type='video' id='video-upload' onEmojiSelect={() => {}} />
        )}
        {activeUpload === 'gif' && (
          <FileUpload type='gif' id='gif-upload' onEmojiSelect={() => {}} />
        )}

        {activeUpload === 'emoji' && (
          <FileUpload
            type='emoji'
            id='emoji-upload'
            onEmojiSelect={handleEmojiSelect}
          />
        )}
      </div>
    </Box>
  );
};

export default MediaSelect;

// This file is an individual fileUpload and preview button. It is integrated into Media Select file.
// The method FileUpload takes the file type and id, and generate file input and preview accordingly.

interface FileUploadProps {
  type: 'image' | 'video' | 'gif' | 'emoji'; // specify the allowed types
  id: string; // add an id prop to handle multiple FileUpload components
  onEmojiSelect: (emoji: string | null) => void;
} // looked up how to use react interface on ChatGPT

const FileUpload: React.FC<FileUploadProps> = ({ type, id, onEmojiSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a blob URL representing the file
      // TODO: Handle the file upload to the server here
    }
  };

  const deleteFileSelected = () => {
    // eslint-disable-next-line no-console
    if (previewUrl) {
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  };

  let acceptedTypes = '';
  let isEmoji = false;

  switch (type) {
    case 'image':
      acceptedTypes = '.jpg,.jpeg,.png,';
      break;

    case 'video':
      acceptedTypes = '.mp4,.avi,.mov';
      break;

    case 'gif':
      acceptedTypes = '.gif';
      break;

    case 'emoji':
      isEmoji = true;
      break;
  }
  // in your component return function
  if (isEmoji) {
    return (
      <Box>
        <EmojiMenu onEmojiSelect={onEmojiSelect}></EmojiMenu>
      </Box>
    );
  } else {
    return (
      <Box>
        <Input
          type='file'
          onChange={handleFileChange}
          hidden
          id={id}
          accept={acceptedTypes}
        />
        {selectedFile && previewUrl && (
          <>
            <Box>File Selected: {selectedFile.name}</Box>
            <Button onClick={() => deleteFileSelected()}>
              Delete File Selected
            </Button>
            {type === 'image' && <Image src={previewUrl} alt='Preview' />}
            {type === 'video' && <video src={previewUrl} controls />}
            {type === 'gif' && <Image src={previewUrl} alt='Preview' />}
          </>
        )}
      </Box>
    );
  }
};

interface EmojiMenuProps {
  onEmojiSelect: (emoji: string | null) => void;
}

function EmojiMenu({ onEmojiSelect }: EmojiMenuProps) {
  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
  };

  const getEmoji = useMemo(() => {
    return EmojiSrc.map((emojiItem, index) => (
      <Button
        key={index}
        onClick={() => handleEmojiClick(emojiItem.emoji)}
        style={{ fontSize: '25px', margin: '3px' }}
        backgroundColor='gray.200'
      >
        {emojiItem.emoji}
      </Button>
    ));
  }, []);

  return (
    <Box>
      <Box maxHeight='300px' overflowY='auto' backgroundColor='gray.200'>
        {getEmoji}
      </Box>
    </Box>
  );
}
