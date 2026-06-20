export const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(14px)", scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
};

export const softReveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};
