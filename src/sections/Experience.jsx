import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Web Developer Intern",
    company: "Vault of Codes",
    duration: "Jul 2025 - Oct 2025",
    description: "Gained valuable hands-on experience and exposure to various aspects of web development, focusing on responsive design and modern frameworks.",
  },
  {
    role: "Java Intern",
    company: "Coding Thinker",
    duration: "Jul 2024 - Oct 2024",
    description: "Implemented OOP principles and exception handling in Java-based projects. Focused on data structures and efficient file handling.",
  },
];

const ExperienceItem = ({ exp, idx, start, end, scrollYProgress, isMobile }) => {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const isAbove = idx % 2 === 0;

  const yOffset = useTransform(scrollYProgress, [start, end], [isAbove ? 15 : -15, 0]);
  const xOffset = useTransform(scrollYProgress, [start, end], [isMobile ? -15 : 0, 0]);

  return (
    <div className={`relative flex ${isMobile ? "items-start mb-8" : "flex-1 justify-center items-center"}`}>
      <motion.div
        className={`z-10 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.1)] ${isMobile ? "absolute -left-[9px] top-2 w-4 h-4" : "w-5 h-5"}`}
        style={{ scale: markerScale, opacity }}
      />

      <motion.article
        style={{ opacity, y: isMobile ? 0 : yOffset, x: isMobile ? xOffset : 0 }}
        className={`bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-xl
          ${isMobile ? "ml-8 w-full max-w-sm" : `absolute w-[280px] ${isAbove ? "bottom-12" : "top-12"}`}
        `}
      >
        <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">{exp.duration}</span>
        <h3 className="text-lg font-bold mt-0.5">{exp.role}</h3>
        <p className="text-gray-400 text-sm font-medium mb-2">{exp.company}</p>
        <p className="text-xs text-gray-300 leading-relaxed">{exp.description}</p>
      </motion.article>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start 20%" means the animation begins when the top of the container is 20% from the top of the screen
    offset: ["start 20%", "end 80%"], 
  });

  const thresholds = useMemo(() => experiences.map((_, i) => (i + 1) / experiences.length), []);
  const lineScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="bg-black py-16 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
        Experience
      </h2>

      {/* REDUCED HEIGHT: Now significantly shorter for faster scrolling */}
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-6" style={{ height: "120vh" }}>
        <div className="sticky top-1/2 -translate-y-1/2 w-full">
          
          {/* Desktop */}
          <div className="hidden md:block">
            <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="absolute top-0 left-0 h-full bg-cyan-500 origin-left" style={{ width: lineScale }} />
            </div>
            <div className="flex justify-between">
              {experiences.map((exp, i) => (
                <ExperienceItem 
                  key={i} 
                  exp={exp} 
                  idx={i} 
                  start={i === 0 ? 0 : thresholds[i-1]} 
                  end={thresholds[i]} 
                  scrollYProgress={scrollYProgress} 
                  isMobile={false}
                />
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden relative min-h-[300px]">
             <div className="absolute left-0 top-0 w-1 h-full bg-white/10 rounded-full overflow-hidden">
                <motion.div className="absolute top-0 left-0 w-full bg-cyan-500 origin-top" style={{ height: lineScale }} />
             </div>
             <div className="flex flex-col">
              {experiences.map((exp, i) => (
                <ExperienceItem 
                  key={i} 
                  exp={exp} 
                  idx={i} 
                  start={i === 0 ? 0 : thresholds[i-1]} 
                  end={thresholds[i]} 
                  scrollYProgress={scrollYProgress} 
                  isMobile={true}
                />
              ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;