import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 1. Move Handler: Uses direct DOM manipulation for 60fps performance
    const moveHandler = (e) => {
      if (cursorRef.current) {
        // translate3d triggers GPU acceleration
        // -50% -50% ensures the glow is centered on the tip of the pointer
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    // 2. Hover Detection: Checks if the mouse is over an interactive element
    const checkHover = (e) => {
      const target = e.target;
      const isSelectable = 
        window.getComputedStyle(target).cursor === "pointer" || 
        target.tagName === "A" || 
        target.tagName === "BUTTON";
      
      setIsHovering(isSelectable);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", checkHover);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      // pointer-events-none is CRITICAL: it prevents the cursor from blocking clicks on buttons
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
      style={{
        transition: "transform 0.15s ease-out", 
      }}
    >
      {/* The Cursor Visual */}
      <div
        className={`rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-2xl opacity-60 transition-all duration-300 ease-in-out ${
          isHovering ? "h-32 w-32 opacity-40" : "h-20 w-20 opacity-70"
        }`}
      />
      
      {/* Optional: Small solid dot in the center for precision */}
      <div className="absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-50" />
    </div>
  );
}