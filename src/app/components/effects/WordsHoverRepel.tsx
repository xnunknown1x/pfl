"use client";
import { useEffect, useRef } from "react";

interface WordsHoverRepelProps {
  children: string; // Only plain text/sentences
}
export default function WHR({ children }: WordsHoverRepelProps) {
  const words = children.split(" ");

  // Create a ref for each word
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array
    wordRefs.current = wordRefs.current.slice(0, words.length);
  }, [words.length]);

  const handleMouseMove = (index: number) => (e: React.MouseEvent) => {
    const el = wordRefs.current[index];
    if (!el) return;
    const Sensitivity = 1; //Change this For this to increase or decrease moving sensitivity
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    const distance = Math.min(Math.sqrt(offsetX ** Sensitivity + offsetY ** Sensitivity), 15);
    const angle = Math.atan2(offsetY, offsetX);

    const moveX = -Math.cos(angle) * distance;
    const moveY = -Math.sin(angle) * distance;

    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    el.style.transition = "transform 0.3s ease";
  };

  const handleMouseLeave = (index: number) => () => {
    const el = wordRefs.current[index];
    if (el) {
      el.style.transition = "transform 0.3s ease";
      el.style.transform = `translate(0, 0)`;
    }
  };

  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => {
  wordRefs.current[i] = el;
}}
          onMouseMove={handleMouseMove(i)}
          onMouseLeave={handleMouseLeave(i)}
          className="inline-block mx-1 transition-transform"
          style={{zIndex:"20"}} 
        >
          {word}
        </span>
      ))}
    </span>
  );
}