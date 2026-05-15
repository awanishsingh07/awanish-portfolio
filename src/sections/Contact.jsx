import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import Astra from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers for budget
    if (name === "budget" && value && !/^\d+$/.test(value)) return;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};

    required.forEach((f) => {
      if (!formData[f].trim()) newErrors[f] = "Required";
    });

    // Match the value "Others" from the select options
    if (formData.service && formData.service !== "Others" && !formData.budget.trim()) {
      newErrors.budget = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", service: "", budget: "", idea: "" });
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-black text-white py-20 px-6 md:px-20 overflow-hidden">
      <ParticlesBackground />

      {/* Background Blobs for consistency */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#302b63] opacity-20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00bf8f] opacity-20 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <motion.img
            src={Astra}
            alt="Contact Illustration"
            className="w-64 md:w-[500px] drop-shadow-[0_0_30px_rgba(28,216,210,0.3)]"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
            Let's Build Something
          </h2>
          <p className="text-gray-400 mb-8">Have a vision? Let’s turn it into code.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`bg-white/10 border ${errors.name ? 'border-red-500' : 'border-white/10'} p-3 rounded-xl focus:outline-none focus:border-[#00bf8f] transition-all`}
                />
              </div>
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@world.com"
                  className={`bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/10'} p-3 rounded-xl focus:outline-none focus:border-[#00bf8f] transition-all`}
                />
              </div>
            </div>

            {/* Service */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Service Needed</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`bg-[#1a1a1a] border ${errors.service ? 'border-red-500' : 'border-white/10'} p-3 rounded-xl focus:outline-none focus:border-[#00bf8f] transition-all`}
              >
                <option value="" disabled>Select a service</option>
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Full Stack Web Development">Full Stack Development</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Budget (Conditional) */}
            {formData.service && formData.service !== "Others" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Budget (INR)</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. 10000"
                  className="bg-white/10 border border-white/10 p-3 rounded-xl focus:outline-none focus:border-[#00bf8f]"
                />
              </motion.div>
            )}

            {/* Idea */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Your Vision</label>
              <textarea
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                rows={4}
                placeholder="Briefly describe your project..."
                className={`bg-white/10 border ${errors.idea ? 'border-red-500' : 'border-white/10'} p-3 rounded-xl focus:outline-none focus:border-[#00bf8f] transition-all`}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "sending"}
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] shadow-[0_0_20px_rgba(0,191,143,0.3)] hover:shadow-[0_0_30px_rgba(0,191,143,0.5)] transition-all disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence>
              {status === "success" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center font-medium">
                  Message sent! I'll get back to you soon. ✅
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center font-medium">
                  Something went wrong. Please try again. ❌
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}