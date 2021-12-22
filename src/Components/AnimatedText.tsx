import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  children: React.ReactNode;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant: 'sansHeading' | 'serifHeading' | 'sansBody';
  splitOn?: 'words' | 'chars';
  overflowHidden?: true;
  delay?: number;
  staggerChildren?: true;
  animateFrom?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  size,
  variant,
  splitOn,
  delay,
  overflowHidden,
  staggerChildren,
  animateFrom,
}) => {
  const getElements = () => {
    if (splitOn === 'words') {
      return children?.toString().split(/(\s+)/);
    }
    if (splitOn === 'chars') {
      return children?.toString().split(/(?!$)/u);
    }
    return children?.toString();
  };

  const elements = getElements();

  const getSize = () => {
    switch (size) {
      case 'xs':
        return 'text-xs';
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-md';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      default:
        return '';
    }
  };

  // NEED DEFAULT
  const getAnimation = () => {
    switch (animateFrom) {
      case 'top':
        return { x: 0, y: '-105%' };
      case 'bottom':
        return { x: 0, y: '105%' };
      case 'left':
        return { x: '-105%', y: 0 };
      case 'right':
        return { x: '105%', y: 0 };
      case 'top-left':
        return { x: '-50%', y: '-105%' };
      case 'top-right':
        return { x: '50%', y: '-105%' };
      case 'bottom-left':
        return { x: '-50%', y: '105%' };
      case 'bottom-right':
        return { x: '50%', y: '105%' };
      default:
        return '';
    }
  };

  const parentAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay || 0.5,
        when: 'beforeChildren',
        staggerChildren: staggerChildren ? 0.015 : 0.005,
      },
    },
  };

  const childAnimation = {
    hidden: getAnimation() || {},
    visible: (i: number) => ({
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: i < 10 ? 0.7 + i * 0.01 : 1,
        ease: [0.2, 0.9, 0.6, 1],
      },
    }),
  };

  if (Array.isArray(elements)) {
    return (
      <motion.div
        variants={parentAnimation}
        initial='hidden'
        animate='visible'
        className='flex flex-wrap'
      >
        {elements.map((el, i) => (
          <div
            style={
              overflowHidden
                ? { overflowY: 'hidden', overflowX: 'visible' }
                : {}
            }
            className='pt-1'
          >
            <motion.span
              key={i}
              variants={childAnimation}
              custom={i}
              className={classNames('text-textPrimary', getSize(), variant)}
            >
              {el}
            </motion.span>
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <span className={classNames('text-textPrimary', getSize(), variant)}>
      {elements}
    </span>
  );
};

export default AnimatedText;
