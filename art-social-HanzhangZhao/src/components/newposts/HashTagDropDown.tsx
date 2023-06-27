/*import React, {useState,useEffect} from 'react';

const hashtags = ['tag1','tag2','tag3','tag4'];

const HashTagDropDown=()=>{
  const [inputValue,setInputValue] = useState('');
  const [visible,setVisible] = useState(false);
  const [filteredHashtags,setFilteredHashtags] = useState(hashtags)
  const [selectedHashtags,setSelectedHashtags] = useState<string[]>([])
  const [visible1,setVisible1] = useState(false)

useEffect(()=> {
  if (inputValue.charAt(inputValue.length-1)==='#'){
    setVisible(true)
    const search = inputValue.slice(inputValue.lastIndexOf('#')+1).toLowerCase()
    setFilteredHashtags(hashtags.filter(tag=>tag.toLowerCase().includes(search)))
  }else{
    setVisible(false)
  }
}
,[inputValue]);

const selectHashTag = (tag)=>{
  setSelectedHashtags([...selectedHashtags,tag]);
  setInputValue(inputValue.substring(0, inputValue.lastIndexOf("#")));
  setVisible(false);
}

const removeHashTag = (tag)=>{
  setSelectedHashtags(selectedHashtags.filter(selectedTag=>selectedTag!==tag))
}
return (
  <div>
    (
      <input 
      type="text"
      value={inputValue}
      onChange={(e)=>setInputValue(e.target.value)}
    />
    )
    <div></div>
    {selectedHashtags.map(tag=>(
      <span onClick={()=>removeHashTag(tag)} key={tag}>
        #{tag}
      </span>
    )  
    )}
    {visible && (
      <div style={{border: '1px solid black', borderRadius: '5px', padding: '10px'}}>
        {filteredHashtags.map(tag=>(
          <div 
          key = {tag}
          style={{padding: '5px', cursor: 'pointer'}}
          onClick={()=>selectHashTag(tag)}
          >
            #{tag}
          </div>
        ))}
      </div>
    )
    }
  </div>
  );
};

export default HashTagDropDown;*/

import React, { useState, useEffect } from 'react';

const hashtags = ['tag1', 'tag2', 'tag3', 'tag4'];

const HashTagDropDown = () => {
  const [inputValue, setInputValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [filteredHashtags, setFilteredHashtags] = useState(hashtags);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  useEffect(() => {
    if (inputValue.charAt(inputValue.length - 1) === '#') {
      setVisible(true);
      const search = inputValue
        .slice(inputValue.lastIndexOf('#') + 1)
        .toLowerCase();
      setFilteredHashtags(
        hashtags.filter((tag) => tag.toLowerCase().includes(search))
      );
    } else {
      setVisible(false);
    }
  }, [inputValue]);

  const selectHashTag = (tag) => {
    setSelectedHashtags([...selectedHashtags, tag]);
    setInputValue(inputValue.substring(0, inputValue.lastIndexOf('#')));
    setVisible(false);
  };

  const removeHashTag = (tag) => {
    setSelectedHashtags(
      selectedHashtags.filter((selectedTag) => selectedTag !== tag)
    );
  };

  return (
    <div>
      <div>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div></div>
        {selectedHashtags.map((tag) => (
          <span onClick={() => removeHashTag(tag)} key={tag}>
            #{tag}
          </span>
        ))}
        {visible && (
          <div
            style={{
              border: '1px solid black',
              borderRadius: '5px',
              padding: '10px',
            }}
          >
            {filteredHashtags.map((tag) => (
              <div
                key={tag}
                style={{ padding: '5px', cursor: 'pointer' }}
                onClick={() => selectHashTag(tag)}
              >
                #{tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HashTagDropDown;
