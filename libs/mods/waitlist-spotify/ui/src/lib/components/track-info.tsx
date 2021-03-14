import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COVER_SIZE = 64;

interface TrackInfoProps {
  imageUrl?: string;
  artist?: string;
  name?: string;
  progress?: number;
}

export const TrackInfo: React.FC<TrackInfoProps> = ({
  imageUrl,
  artist,
  name,
  progress = 0,
}) => (
  <div className="w-full h-full relative overflow-hidden">
    <AnimatePresence>
      <motion.div
        key={imageUrl}
        className="absolute left-0 top-0 h-full w-full bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${imageUrl})`,
          filter: 'blur(14px) brightness(0.3)',
        }}
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -COVER_SIZE }}
      />
    </AnimatePresence>
    <motion.div
      className="absolute bottom-0 opacity-30 bg-backgorud"
      style={{ left: COVER_SIZE, height: COVER_SIZE }}
      animate={{ width: `calc(${progress * 100}% - ${COVER_SIZE}px)` }}
    />
    <div className="flex absolute left-0 bottom-0">
      <div style={{ height: `${COVER_SIZE}px`, width: `${COVER_SIZE}px` }}>
        <AnimatePresence>
          <motion.img
            key={imageUrl}
            src={imageUrl}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -COVER_SIZE }}
          />
        </AnimatePresence>
      </div>
      <div className="flex justify-center px-4 flex-col">
        <span className="text-xl text-accent">{artist}</span>
        <span className="text-2xl text-white">{name}</span>
      </div>
    </div>
  </div>
);
