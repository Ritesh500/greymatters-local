import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function GradientButton({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'default',
  icon = true,
  className = '' 
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 group";

  const variants = {
    primary:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/25 hover:shadow-red-500/40",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline:
      "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white",
    outlineLight:
      "border-2 border-white text-white hover:bg-white hover:text-slate-900",
    ghost: "text-slate-700 hover:text-red-600 hover:bg-red-50",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm gap-2",
    default: "px-7 py-3.5 text-base gap-2.5",
    lg: "px-9 py-4.5 text-lg gap-3",
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const buttonContent = (
    <>
      {children}
      {icon && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  // ✅ NEXT.JS SAFE LINK
  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href || '/'} className={combinedClasses}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  // ✅ NORMAL BUTTON
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={combinedClasses}
    >
      {buttonContent}
    </motion.button>
  );
}
