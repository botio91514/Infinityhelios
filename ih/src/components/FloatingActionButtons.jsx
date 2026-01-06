import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function FloatingActionButtons() {
  const [isHovered, setIsHovered] = useState(null);

  const whatsappNumber = "919000000000";
  const whatsappMessage = "Hello, I'm interested in your solar solutions.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const phoneNumber = "+919000000000";
  const callUrl = `tel:${phoneNumber}`;

  const actions = [
    {
      id: "whatsapp",
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      label: "Chat with Expert",
      color: "bg-[#25D366]",
      href: whatsappUrl,
      type: "a"
    },
    {
      id: "call",
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Book a Call",
      color: "bg-solarGreen",
      href: callUrl,
      type: "a"
    },
    {
      id: "inquiry",
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      label: "Get Inquiry",
      color: "bg-solarGreen",
      link: "/contact",
      type: "link"
    }
  ];

  return (
    <div className="fixed right-4 md:right-8 bottom-8 z-[100] flex flex-col gap-4">
      {actions.map((action) => (
        <div key={action.id} className="relative group flex items-center justify-end">
          <span
            className="absolute right-full mr-4 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap border border-white/10"
          >
            {action.label}
          </span>

          {action.type === "a" ? (
            <motion.a
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: action.id === "whatsapp" ? 5 : 0 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${action.color} text-white shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white/20`}
            >
              {action.icon}
            </motion.a>
          ) : (
            <Link to={action.link}>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${action.color} text-white shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white/20`}
              >
                {action.icon}
              </motion.div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
