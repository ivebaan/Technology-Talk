import React, { useState, useEffect } from "react";

function Typewriter({ texts, speed = 100, pause = 1500, textSize}) {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typing = setInterval(() => {
      setDisplayedText(texts[textIndex].slice(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
    }, speed);

    if (charIndex === texts[textIndex].length) {
      clearInterval(typing);
      setTimeout(() => {
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, pause);
    }

    return () => clearInterval(typing);
  }, [charIndex, textIndex, texts, speed, pause]);

  return <h2 className={`text-white text-center text-${textSize} font-light`}>{displayedText}</h2>;

}
export default Typewriter;
