import { motion, AnimatePresence } from "framer-motion";

export default function StudentLoginTransition({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            exit: { duration: 0.6, ease: "easeOut" }
          }}
        >
          {/* Left Door */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-[#fe0002]"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              exit: {
                duration: 1.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.3
              }
            }}
          >
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-black/10" />
            
            {/* Edge glow */}
            <motion.div
              className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-white/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ exit: { duration: 0.8 } }}
            />
          </motion.div>

          {/* Right Door */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-[#fe0002]"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              exit: {
                duration: 1.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.3
              }
            }}
          >
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/5 to-black/10" />
            
            {/* Edge glow */}
            <motion.div
              className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ exit: { duration: 0.8 } }}
            />
          </motion.div>

          {/* Content Container */}
          <motion.div
            className="relative z-10 text-center px-6"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -30 }}
            transition={{ 
              animate: { 
                delay: 0.2, 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              },
              exit: { 
                duration: 0.8, 
                ease: [0.76, 0, 0.24, 1] 
              }
            }}
          >
            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
              initial={{ letterSpacing: "0em", opacity: 0 }}
              animate={{ letterSpacing: "-0.04em", opacity: 1 }}
              exit={{ letterSpacing: "-0.06em", opacity: 0, y: -40 }}
              transition={{ 
                animate: { delay: 0.4, duration: 0.8 },
                exit: { duration: 0.7 }
              }}
            >
              Welcome Back
            </motion.h1>
            
            {/* Animated divider */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "140px", opacity: 1 }}
              exit={{ width: "200px", opacity: 0 }}
              transition={{ 
                animate: { delay: 0.7, duration: 0.6 },
                exit: { duration: 0.6 }
              }}
              className="h-1 bg-white/90 mx-auto rounded-full my-8"
            />

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-white/95 font-light max-w-2xl mx-auto tracking-wide"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ 
                animate: { delay: 0.6, duration: 0.7 },
                exit: { duration: 0.6 }
              }}
            >
              Your learning journey continues
            </motion.p>

            {/* Loading animation */}
            <motion.div 
              className="flex justify-center gap-3 pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                animate: { delay: 0.9, duration: 0.5 },
                exit: { duration: 0.4 }
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Ambient glow effects */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{ 
              animate: { delay: 0.4, duration: 1.2, ease: "easeOut" },
              exit: { duration: 1 }
            }}
          />

          {/* Radial light burst effect as doors open */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-white/0 via-white/0 to-white/0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ 
              background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 70%)",
              opacity: 1 
            }}
            transition={{
              exit: { delay: 0.5, duration: 1.2, ease: "easeOut" }
            }}
          />

          {/* Soft vignette */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              animate: { delay: 0.3, duration: 0.8 },
              exit: { duration: 0.6 }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}