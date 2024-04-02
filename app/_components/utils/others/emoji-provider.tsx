"use client";

import { Smile } from "lucide-react";
import { useState } from "react";
import EmojiSelector from "./emoji-selector";

interface PageProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmojiProvider({ comment, setComment }: PageProps) {
  const [isEmojiVisible, setEmojiVisible] = useState(false);

  const toggleEmoji = () => {
    setEmojiVisible((prev) => !prev);
  };

  return (
    <>
      <Smile onClick={toggleEmoji} />

      {isEmojiVisible && (
        <div className='relative'>
          <EmojiSelector
            toggleEmoji={toggleEmoji}
            comment={comment}
            setComment={setComment}
          />
        </div>
      )}
    </>
  );
}
