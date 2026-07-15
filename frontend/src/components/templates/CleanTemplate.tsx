import React from "react";

interface CleanTemplateProps {
  text: string;
  shadowIntensity: number;
  subtitleSize?: number;
}

export function CleanTemplate({ text, shadowIntensity, subtitleSize = 16 }: CleanTemplateProps) {
  const baseShadow = shadowIntensity > 0
    ? [
        `0 0 ${shadowIntensity * 0.5}px rgba(0,0,0,0.9)`,
        `0 0 ${shadowIntensity * 1}px rgba(0,0,0,0.7)`,
        `0 0 ${shadowIntensity * 2}px rgba(0,0,0,0.5)`,
        `0 0 ${shadowIntensity * 3}px rgba(0,0,0,0.3)`,
        `0 1px 2px rgba(0,0,0,0.9)`,
      ].join(", ")
    : "none";

  return (
    <span
      className="text-center font-bold text-white"
      style={{
        textShadow: baseShadow,
        fontSize: `${subtitleSize}px`,
      }}
    >
      {text}
    </span>
  );
}
