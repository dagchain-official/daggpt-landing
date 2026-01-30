import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export function NavBar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items[0].name)

  return (
    <div
      className={cn(
        "fixed bottom-8 sm:top-0 left-1/2 -translate-x-1/2 z-[100] sm:pt-6 pointer-events-none",
        className,
      )}
    >
        <div className="flex items-center gap-1 bg-white/40 border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-2xl py-1.5 px-1.5 rounded-full pointer-events-auto">
          {items.map((item) => {
            const isActive = activeTab === item.name

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.name);
                }}
                className={cn(
                  "relative cursor-pointer text-[9px] md:text-[11px] font-black uppercase tracking-widest px-3 md:px-6 py-2 md:py-2.5 rounded-full transition-all duration-300",
                  isActive 
                    ? "text-slate-900" 
                    : "text-slate-400 hover:text-slate-600",
                )}
              >
              <span className="relative z-10">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-white border border-slate-100 shadow-sm rounded-full z-0"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}
