import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";
import photo1 from "../assets/photo1.JPG";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";

const useIsMobile = (query = "(max-width: 767px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  const projects = useMemo(
    () => [
      {
        title: "Smart Hire",
        link: "https://smart-job-portal-brown.vercel.app/",
        github: "https://github.com/awanishsingh07/SmartHire",
        image: isMobile ? photo1 : img1,
        description:
          "Full-stack job portal with role-based JWT authentication and automated application workflows.",
        tech: ["Spring Boot", "React", "MySQL", "JWT"],
        accent: "#00bf8f",
      },
      {
        title: "ApplyTrack",
        link: "https://applytrack-frontend.netlify.app/",
        github: "https://github.com/awanishsingh07/applytrack-frontend",
        image: isMobile ? photo2 : img2,
        description:
          "Job application tracker featuring real-time status filtering, reducing manual tracking effort by 40%.",
        tech: ["React", "PostgreSQL", "Spring Boot", "Netlify"],
        accent: "#1CD8D2",
      },
      {
        title: "Expense Ledger",
        link: "https://ledger-finance-awanish.vercel.app/",
        github: "https://github.com/awanishsingh07/ledger",
        image: isMobile ? photo3 : img3,
        description:
          "Finance management tool for tracking personal expenses and visualizing budget distributions.",
        tech: ["React", "Tailwind CSS", "Vercel", "JavaScript"],
        accent: "#302b63",
      },
    ],
    [isMobile],
  );

  useEffect(() => {
    const observers = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          // lower threshold so it works on mobile too
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [projects]);

  const activeAccent = projects[activeIndex]?.accent;

  return (
    <section
      id="projects"
      className="relative text-white bg-black overflow-hidden"
    >
      {/* Background blobs — matches About.jsx */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full opacity-20 blur-[120px] animate-pulse transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle, ${activeAccent}, #302b63)`,
          }}
        />
        <div
          className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full opacity-15 blur-[140px] animate-pulse transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle, #1CD8D2, ${activeAccent}, #302b63)`,
            animationDelay: "300ms",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full opacity-10 blur-[100px] transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle, ${activeAccent}, #1CD8D2)`,
          }}
        />
      </div>

      {/* Sticky heading */}
      <div className="sticky top-0 z-30 pt-8 pb-3 flex justify-center pointer-events-none">
        <h2 className="text-lg md:text-2xl font-bold uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm px-4 py-1 rounded-full border border-white/5">
          My Work
        </h2>
      </div>

      <div className="flex flex-col">
        {projects.map((project, idx) => (
          <div
            key={project.title}
            ref={(el) => (sectionRefs.current[idx] = el)}
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20"
          >
            <div className="w-full max-w-5xl flex flex-col items-center gap-6 sm:gap-8">
              {/* Title — always rendered, opacity controlled by activeIndex */}
              <motion.h3
                key={project.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="font-black italic text-center tracking-tighter bg-clip-text text-transparent w-full px-2"
                style={{
                  fontSize: "clamp(2rem, 8vw, 6rem)",
                  backgroundImage:
                    "linear-gradient(to right, #1CD8D2, #00bf8f, #ffffff)",
                  lineHeight: 1.1,
                }}
              >
                {project.title}
              </motion.h3>

              {/* Project image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full relative group rounded-2xl overflow-hidden border border-white/10"
                style={{ boxShadow: `0 0 60px ${project.accent}44` }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
              </motion.div>

              {/* Description */}
              <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed text-center px-2">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 sm:px-4 py-1 text-xs font-mono rounded-full border border-white/20 bg-white/5 text-cyan-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 justify-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-gray-200 transition text-sm sm:text-base"
                >
                  View Project
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-white/20 transition text-sm sm:text-base"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
