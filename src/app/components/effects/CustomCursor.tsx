"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let opacity = 0;
    // let visible = false;
    let lastMoveTime = Date.now();

    const speed = 0.05;
    const fadeSpeed = 0.08;

    const animate = () => {
      const now = Date.now();
      const idleTime = now - lastMoveTime;

      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      const shouldBeVisible = idleTime < 1000;

      // Fade in/out
      if (shouldBeVisible && opacity < 1) {
        opacity += fadeSpeed;
      } else if (!shouldBeVisible && opacity > 0) {
        opacity -= fadeSpeed;
      }

      opacity = Math.min(Math.max(opacity, 0), 1);

      if (cursor) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        cursor.style.opacity = `${opacity}`;
      }

      requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = Date.now();
    };

    animate();
    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed z-50 w-10 h-10 pointer-events-none transition-opacity duration-300"
      style={{
        left:"-20px",
        top:"-20px",
        backgroundImage: `url("/cursor-white.png")`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        willChange: "transform, opacity",
        opacity: 0,
      }}
    />
  );
}