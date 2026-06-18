import React from "react";
import "devicon/devicon.min.css";

interface DeviconProps {
  name: string;
  logoStyle?: "plain" | "original" | "line";
  colored?: boolean;
  size?: string;
  color?: string;
  style?: React.CSSProperties;
  iconClass?: string;
  wordmark?: boolean;
}

/**
 * Custom Devicon component mapping to the official devicon font styles.
 * Mimics the devicon-react API but runs natively in Turbopack.
 */
export default function Devicon({
  name,
  logoStyle = "plain",
  colored = false,
  size,
  color,
  style = {},
  iconClass = "",
  wordmark = false,
}: DeviconProps) {
  const customStyle: React.CSSProperties = {
    fontSize: size || "2.5rem",
    color: color,
    ...style,
  };

  let format = `devicon-${name}-${logoStyle}`;
  if (wordmark) {
    format += "-wordmark";
  }
  if (colored && !color) {
    format += " colored";
  }

  return (
    <div className="inline-block">
      <i className={`${format} ${iconClass}`} style={customStyle}></i>
    </div>
  );
}
