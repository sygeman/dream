import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Properties = {
  imageUrl?: string;
};

export const Backgroud = ({ imageUrl }: Properties) => (
  <AnimatePresence>
    <motion.div
      key={imageUrl}
      className="absolute left-0 top-0 h-full w-full bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${imageUrl})`,
        filter: 'blur(24px) brightness(0.1)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  </AnimatePresence>
);
