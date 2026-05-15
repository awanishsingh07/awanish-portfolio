import { FaJava, FaReact } from "react-icons/fa";
import {
  SiSpringboot,
  SiSpring,
  SiTailwindcss,
  SiDocker,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiFastapi,
} from "react-icons/si";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <SiSpringboot />, name: "Spring Boot" },
    { icon: <SiSpring />, name: "Spring Framework" },
    { icon: <SiFastapi />, name: "REST API" },
    { icon: <FaReact />, name: "React.js" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiHtml5 />, name: "HTML5" },
    { icon: <SiCss3 />, name: "CSS3" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiGit />, name: "Git" },
    { icon: <SiGithub />, name: "GitHub" },
    { icon: <SiPostman />, name: "Postman" },
  ];
  
  // Duplicate skills for seamless looping
  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  // Intersection Observer to stop animation when not on screen (Performance)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sync scroll direction with mouse wheel/touch
  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => {
        if (e.deltaY !== 0) setDir(e.deltaY > 0 ? -1 : 1);
    };
    
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      if (Math.abs(delta) > 5) {
          setDir(delta > 0 ? 1 : -1);
          touchY.current = e.touches[0].clientY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  // Animation Loop
  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 60; // Slightly slower for better readability

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      
      let next = x.get() + SPEED * dir * dt;
      
      // Calculate loop point based on half the track width
      const track = trackRef.current;
      if (track) {
        const halfWidth = track.scrollWidth / 2;
        if (next <= -halfWidth) next += halfWidth;
        if (next >= 0) next -= halfWidth;
      }

      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full py-20 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.h2
        className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Technical Skills
      </motion.h2>
      
      <p className="mt-4 mb-12 text-gray-400 text-base sm:text-lg z-10">
        The technologies I use to bring ideas to life.
      </p>

      <div className="relative w-full">
        {/* Faded edges for a "modern" look */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        <motion.div
          ref={trackRef}
          className="flex gap-12 text-6xl text-[#1cd8d2] py-4" // Added py-4 to prevent hover clipping
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 min-w-[140px]"
            >
              <div className="hover:scale-110 hover:text-white transition-all duration-300 cursor-default">
                {s.icon}
              </div>
              <p className="text-xs font-mono tracking-widest text-gray-500 uppercase">{s.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}