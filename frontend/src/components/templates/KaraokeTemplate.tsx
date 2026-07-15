import React from "react";

interface KaraokeTemplateProps {
  text: string;
  currentTime: number;
  start: number;
  end: number;
  subtitleSize?: number;
}

export function KaraokeTemplate({ text, currentTime, start, end, subtitleSize = 14 }: KaraokeTemplateProps) {
  const words = text.split(" ");
  const totalChars = text.length || 1;
  const segmentDuration = end - start;
  let charAccumulator = 0;
  
  const wordData = words.map((word, index) => {
    const wordWithSpace = word + (index < words.length - 1 ? " " : "");
    const wordLen = wordWithSpace.length;
    const wordStart = start + (charAccumulator / totalChars) * segmentDuration;
    charAccumulator += wordLen;
    const wordEnd = start + (charAccumulator / totalChars) * segmentDuration;
    return { text: wordWithSpace, start: wordStart, end: wordEnd };
  });

  return (
    <div
      className="max-w-[280px] text-center font-extrabold text-white"
      style={{
        fontFamily: "var(--font-poppins), var(--font-inter), sans-serif",
        fontSize: `${subtitleSize}px`,
        lineHeight: "1.3",
        whiteSpace: "pre-wrap",
      }}
    >
      {wordData.map((wd, idx) => {
        const isPast = currentTime > wd.end;
        const isCurrent = currentTime >= wd.start && currentTime <= wd.end;
        
        let bgStyle = {};
        if (isPast) {
          bgStyle = { background: "#dc2626" };
        } else if (isCurrent) {
          const wordProgress = (currentTime - wd.start) / (wd.end - wd.start || 1);
          bgStyle = {
            background: "linear-gradient(to right, #dc2626 50%, rgba(220, 38, 38, 0) 50%)",
            backgroundSize: "200% 100%",
            backgroundPosition: `${100 - wordProgress * 100}% 0`,
          };
        } else {
          bgStyle = { background: "transparent" };
        }

        return (
          <span
            key={idx}
            style={{
              padding: "2px 1px",
              display: "inline",
              ...bgStyle,
            }}
          >
            {wd.text}
          </span>
        );
      })}
    </div>
  );
}
