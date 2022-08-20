import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

export const Hello = () => {
  const { formatMessage } = useIntl();

  return (
    <div className={clsx('flex h-full flex-col items-center justify-center')}>
      <motion.div
        initial={{ scale: 0.1 }}
        animate={{ scale: 1 }}
        className={clsx('text-4xl')}
      >
        {formatMessage({ id: 'hello' })}
      </motion.div>
    </div>
  );
};
