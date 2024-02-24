"use client";

interface PageProps {
  isName: boolean;
  text: string;
  highlight: string;
}

export const HighlightedText = ({ isName, text, highlight }: PageProps) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <p
      className={
        isName
          ? "text-sm font-medium leading-none"
          : "text-sm font-light text-muted-foregroune"
      }
    >
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className='font-bold text-red-300'>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </p>
  );
};
