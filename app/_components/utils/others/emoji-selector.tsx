import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";

interface PageProps {
  toggleEmoji: any;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const EmojiSelector = ({ toggleEmoji, comment, setComment }: PageProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji.native);
    setComment(comment.concat(emoji.native));
  };

  return (
    <div className={"absolute -left-5 bottom-10"}>
      <Picker
        data={data}
        onClickOutside={toggleEmoji}
        onEmojiSelect={handleEmojiSelect}
      />
    </div>
  );
};

export default EmojiSelector;
