// todo: xin
import { useEffect, useRef, useState } from 'react';

import AccountsSelect from '@/components/newposts/AccountsSelect';
import MediaSelect from '@/components/newposts/MediaSelect';
import TextInput from '@/components/newposts/TextInput';
import ImageUploadButton from '@/components/newposts/ImageUploadButton';
import { BiHappyAlt, BiImageAdd, BiText, BiVideo } from 'react-icons/bi';
import { AiOutlineFileGif } from 'react-icons/ai';
import { MdOutlinePermMedia } from 'react-icons/md';
import { FaHashtag } from 'react-icons/fa';
import HashTagDropdown from '@/components/newposts/HashTagDropDown';
import { Button, Link } from '@chakra-ui/react';

export default function TextInputPanel(props) {
  const [showModal, setShowModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const imageIconRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  return (
    <>
      <h2>InputPanel</h2>
      <AccountsSelect />
      <TextInput selectedEmoji={selectedEmoji} />
      <MediaSelect onEmojiSelect={handleEmojiSelect} />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div ref={imageIconRef}>
          <BiImageAdd size={35} onClick={() => setShowModal(true)} />
        </div>
        <BiVideo size={35} />
        <AiOutlineFileGif size={35} />
        <BiText size={35} />
        <BiHappyAlt size={35} />
        <MdOutlinePermMedia size={35} />
        <FaHashtag onClick={() => setVisible(true)} size={35} />
      </div>
      {visible && <HashTagDropdown></HashTagDropdown>}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0)', // A dark semi-transparent backdrop
            zIndex: 999, // Ensure the backdrop is below the modal but above everything else
          }}
          onClick={handleCloseModal} // Close modal when backdrop is clicked
        >
          <div
            style={{
              position: 'absolute',
              top: `${(imageIconRef.current?.offsetTop || 0) + 35}px`,
              left: imageIconRef.current?.offsetLeft,
              backgroundColor: '#fff',
              padding: '1em',
              zIndex: 1000,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <ImageUploadButton />
          </div>
        </div>
      )}
      <Button>
        <Link href='/api/post_linkedin'>Post with LinkedIn</Link>
      </Button>
    </>
  );
}
