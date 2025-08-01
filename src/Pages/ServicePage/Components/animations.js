export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export const slideVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: '0%', opacity: 1, transition: { duration: 0.7 } },
  exit: { x: '-100%', opacity: 0, transition: { duration: 0.7 } },
};