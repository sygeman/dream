import React from 'react';
import styled from 'styled-components';
import { Flex } from '@pepega/ui/base/Flex';
import { Typography } from '@pepega/ui/Typography';
import { motion, AnimatePresence } from 'framer-motion';

const COVER_SIZE = 64;

const Image = styled(motion.img)`
  position: absolute;
  left: 0;
  top: 0;
`;

const BGImage = styled(motion.div)<{ img: string }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  filter: blur(14px) brightness(0.3);
  background: url(${({ img }) => img});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Progress = styled(motion.div)`
  position: absolute;
  left: ${() => COVER_SIZE}px;
  bottom: 0;
  height: ${() => COVER_SIZE}px;
  opacity: 0.3;
  background: ${({ theme }) => theme.colors.dark2};
`;

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
  <Flex width="100%" height="100%" position="relative" overflow="hidden">
    <AnimatePresence>
      <BGImage
        key={imageUrl}
        img={imageUrl}
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -COVER_SIZE }}
      />
    </AnimatePresence>
    <Progress
      animate={{ width: `calc(${progress * 100}% - ${COVER_SIZE}px)` }}
    />
    <Flex
      maxHeight={`${COVER_SIZE}px`}
      position="absolute"
      left="0px"
      bottom="0px"
    >
      <Flex height={`${COVER_SIZE}px`} width={`${COVER_SIZE}px`} bg="dark1">
        <AnimatePresence>
          <Image
            key={imageUrl}
            src={imageUrl}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -COVER_SIZE }}
          />
        </AnimatePresence>
      </Flex>
      <Flex
        justifyContent="center"
        px="12px"
        height="64px"
        flexDirection="column"
      >
        <Flex>
          <Typography color="accent2" fontSize="20px">
            {artist}
          </Typography>
        </Flex>
        <Flex>
          <Typography fontSize="26px">{name}</Typography>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);
