/** Shared smooth motion presets for HOUSE */
export const smoothEase = [0.22, 1, 0.36, 1] as const;

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: smoothEase },
};

export const revealTransition = {
  duration: 0.55,
  ease: smoothEase,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 260,
  damping: 26,
  mass: 0.8,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export const hoverLift = {
  y: -6,
  transition: springSoft,
};
