import React, { FC } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

interface CarouselSlideProps {
  content?: string;
  name?: string;
  role?: string;
  imageUrl?: string;
  disableAnimations?: boolean;
}

/**
 * @property {string} content - Text inside the card displayed text-xs and text-textPrimary color.
 * @property {string} name - Author of the content displayed text-xs and gradient color.
 * @property {string} role - Role of the author displayed text-xs and text-textSecondary.
 * @property {string} imageUrl - Url address for the image.
 * @property {string} disableAnimations - If true, no animations are shown for any text.
 */
const CarouselSlideCard: FC<CarouselSlideProps> = ({
  content,
  name,
  role,
  imageUrl,
  disableAnimations,
}: CarouselSlideProps) => {
  const cardTextAnimation = {
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
    hidden: { opacity: 0 },
  };
  const cardNameAnimation = {
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
    hidden: { opacity: 0 },
  };
  const cardImageFrameAnimation = {
    visible: {
      rotateY: 360,
      transition: { duration: 1.25, ease: 'easeOut' },
      scale: 0.75,
    },
    hidden: {
      transition: { duration: 1 },
      scale: 0.75,
    },
  };
  const cardImageAnimation = {
    visible: {
      transition: { duration: 1, delay: 0.5, ease: 'easeOut' },
      opacity: 1,
    },
    hidden: { opacity: 0 },
  };

  return (
    <div className=' h-96 bg-gradient-to-r from-gray-900 to-transparent px-12 py-10 rounded-3xl border-2'>
      <motion.div
        className={classNames('h-full flex flex-col justify-between')}
        variants={cardTextAnimation}
        initial='hidden'
        animate='visible'
      >
        {content && (
          <AnimatedText
            disableAnimations={disableAnimations}
            className='text-textPrimary sansBody text-xs'
            splitOn='words'
            animation='bottom'
          >
            {content}
          </AnimatedText>
        )}
        <div className={classNames('flex flex-col')}>
          {name && (
            <motion.span
              className={classNames(
                'gradientMask from-primary to-secondary sansHeading capitalize text-sm'
              )}
              variants={cardNameAnimation}
              initial='hidden'
              animate='visible'
            >
              {name}
            </motion.span>
          )}
          {role && (
            <motion.span
              className={classNames('text-gray-500  text-xs sansHeading')}
              variants={cardNameAnimation}
              initial='hidden'
              animate='visible'
            >
              {role}
            </motion.span>
          )}
        </div>
      </motion.div>

      {imageUrl && (
        <div className={classNames('fixed')}>
          <motion.div
            className={classNames(
              'absolute -top-48 left-128 bg-gradient-to-t from-primary to-secondary rounded-full p-3'
            )}
            variants={cardImageFrameAnimation}
            initial='hidden'
            animate='visible'
          >
            <motion.div
              className={classNames('rounded-full w-96 h-96 overflow-hidden')}
              key={imageUrl}
              variants={cardImageAnimation}
              initial='hidden'
              animate='visible'
            >
              <img
                src={imageUrl}
                alt={imageUrl}
                className='w-full h-full object-cover'
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CarouselSlideCard;
