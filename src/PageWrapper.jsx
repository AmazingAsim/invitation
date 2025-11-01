import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: 100 },   // starts off-screen to the right
  in: { opacity: 1, x: 0 },          // slides in
  out: { opacity: 0, x: -100 },      // slides out to the left
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

export default function PageWrapper({ children }) {
  return ( // ← Missing return statement added here
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      style={{ position: "absolute", width: "100%", height: "100%" }} // Added height: 100%
    >
      {children}
    </motion.div>
  );
}