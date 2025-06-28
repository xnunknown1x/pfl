"use client";
import { useRef, ReactNode } from "react";

interface HoverRepelProps {
  children: ReactNode;
}

export default function HoverRepel({ children }: HoverRepelProps) {
  const repelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = repelRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    const distance = Math.min(Math.sqrt(offsetX ** 2 + offsetY ** 2), 15);
    const angle = Math.atan2(offsetY, offsetX);

    const moveX = -Math.cos(angle) * distance;
    const moveY = -Math.sin(angle) * distance;

    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    el.style.transition = "transform 0.5s ease";
  };
  const handleMouseLeave = () => {
    const el = repelRef.current;
    if (el) {
        el.style.transition = "transform 0.5s ease";
      el.style.transform = "translate(0, 0)";
    }
  };
  return (
    <div
      ref={repelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-200 inline-block"
      // style={{cursor:"pointer"}}
    >
      {children}
    </div>
  );
}