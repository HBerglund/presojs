import React, { FC } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Image from './Image';

type CarouselSlideProps = {
  content?: string;
  name?: string;
  imageUrl?: string;
};

const CarouselSlideCard: FC<CarouselSlideProps> = ({
  content,
  name,
  imageUrl,
}: CarouselSlideProps) => {
  return (
    <div className='bg-primary p-20 rounded-3xl border-2'>
      <div className={classNames('flex flex-col')}>
        {content && (
          <motion.div
            className={classNames('text-textPrimary text-body')}
            key={content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {content}
          </motion.div>
        )}
        {name && (
          <motion.span
            className={classNames(
              'text-textSecondary text-body text-right mt-16'
            )}
            key={name}
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.5 }}
          >
            {name}
          </motion.span>
        )}
      </div>
      {imageUrl && (
        <div className={classNames('fixed')}>
          <motion.div
            className={classNames('absolute -top-20 -right-20')}
            key={imageUrl}
            initial={{
              opacity: 0.25,
            }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: '0%',
            }}
            transition={{ duration: 0.5 }}
          >
            <div className={classNames('border-2 rounded-full')}>
              <Image border size='sm' imageUrl={imageUrl} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CarouselSlideCard;
