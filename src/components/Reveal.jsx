import { motion } from "framer-motion";
import { fadeUp } from "../utils/motion";

export function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={{
        ...fadeUp,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
