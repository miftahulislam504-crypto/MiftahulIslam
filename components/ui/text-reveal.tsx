"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  wordDelay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

function Words({
  words,
  wordDelay,
}: {
  words: string[];
  wordDelay: number;
}) {
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-top">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{
              duration: 0.6,
              delay: i * wordDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i !== words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function TextReveal({
  text,
  className,
  wordDelay = 0.04,
  as = "p",
}: TextRevealProps) {
  const words = text.split(" ");

  switch (as) {
    case "h1":
      return (
        <motion.h1 className={className}>
          <Words words={words} wordDelay={wordDelay} />
        </motion.h1>
      );
    case "h2":
      return (
        <motion.h2 className={className}>
          <Words words={words} wordDelay={wordDelay} />
        </motion.h2>
      );
    case "h3":
      return (
        <motion.h3 className={className}>
          <Words words={words} wordDelay={wordDelay} />
        </motion.h3>
      );
    default:
      return (
        <motion.p className={className}>
          <Words words={words} wordDelay={wordDelay} />
        </motion.p>
      );
  }
}
