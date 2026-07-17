import { motion } from "framer-motion";
import Link from 'next/link';

/* 🔮 ASTROLOGY SERVICES → ROUTE MAP */
const services = [
  { label: "Kundli Matching", path: "/services/kundli-matching" },
  { label: "Birth Chart Analysis", path: "/services/birth-chart-analysis" },
  { label: "Vastu Consultation", path: "/services/vastu-consultation" },
  { label: "Marriage Astrology", path: "/services/marriage-astrology" },
  { label: "Career Predictions", path: "/services/career-predictions" },
  { label: "Remedial Astrology", path: "/services/remedial-astrology" },
  { label: "Muhurat Planning", path: "/services/muhurat-planning" },
  { label: "Gemstone Advice", path: "/services/gemstone-advice" },
  { label: "Financial Astrology", path: "/services/financial-astrology" },
  { label: "Health Astrology", path: "/services/health-astrology" },
  { label: "Educational Astrology", path: "/services/educational-astrology" },
  { label: "Pitra Dosh Remedies", path: "/services/pitra-dosh" },
];

export default function ServicesMarquee() {
  return (
    <div
      className="
        relative
        w-full
        bg-gradient-to-r from-[#0B0F14] via-[#1a1f26] to-[#0B0F14]
        border-t border-b border-[#00B7B3]/20
        py-5
        overflow-hidden
        shadow-[0_0_30px_rgba(0,183,179,0.1)]
      "
    >
      {/* Decorative gradient overlays */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0B0F14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0B0F14] to-transparent z-10 pointer-events-none" />
      
      {/* Decorative stars */}
      <div className="absolute left-1/4 top-1 w-1 h-1 bg-[#00B7B3]/30 rounded-full animate-pulse" />
      <div className="absolute right-1/3 bottom-1 w-1.5 h-1.5 bg-[#00B7B3]/20 rounded-full animate-pulse delay-300" />
      
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...services, ...services].map((service, i) => (
          <Link
            key={i}
            href={service.path}
            className="
              group
              relative
              px-6 py-2.5
              rounded-full
              bg-gradient-to-r from-[#1a1f28] to-[#252b36]
              border border-[#00B7B3]/20
              shadow-lg
              text-sm font-medium
              text-gray-300
              hover:text-white
              transition-all
              duration-500
              whitespace-nowrap
              overflow-hidden
            "
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/0 via-[#00B7B3]/20 to-[#00B7B3]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            {/* Permanent subtle glow */}
            <div className="absolute inset-0 bg-[#00B7B3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Decorative dot */}
            <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-[#00B7B3]/40 mr-2 group-hover:bg-[#00B7B3] transition-colors duration-300" />
            
            {/* Service label */}
            <span className="relative">
              {service.label}
            </span>
            
            {/* Subtle shine effect */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00B7B3]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </Link>
        ))}
      </motion.div>
      
      {/* Bottom subtle glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00B7B3]/30 to-transparent" />
    </div>
  );
}