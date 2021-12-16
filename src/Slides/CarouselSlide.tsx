import React, { FC, useContext, useState } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { DirectionContext } from '../Context/DirectionContext';
import SlideParent from '../Components/SlideParent';
import { SlideType } from '../data';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../assets/arrow-right.svg';

type CarouselSliderProps = {
  title?: string;
  carouselCards: SlideType[];
};

const CarouselSlide: FC<CarouselSliderProps> = ({
  title,
  carouselCards,
}: CarouselSliderProps) => {
  const directionContext = useContext(DirectionContext);
  const [current, setCurrent] = useState<number>(0);

  const goForward = () => {
    directionContext.updateDirection('forward');
    setCurrent((prev) => {
      if (prev !== carouselCards.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  };

  const goBackward = () => {
    directionContext.updateDirection('backward');
    setCurrent((prev) => {
      if (prev !== 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <motion.div
      initial={{
        x: directionContext.direction === 'forward' ? '100%' : '-100%',
      }}
      animate={{ x: '0%' }}
      exit={{
        x: directionContext.direction === 'forward' ? '-100%' : '100%',
      }}
      transition={{ duration: 0.5 }}
    >
      <SlideParent>
        {title && (
          <motion.span
            className={classNames('text-lg text-textPrimary')}
            initial={{
              y: '-200%',
            }}
            animate={{ y: '0%' }}
            exit={{
              y: '100%',
            }}
            transition={{ duration: 1 }}
          >
            {title}
          </motion.span>
        )}
        <div
          className={classNames(
            'w-full h-full flex justify-center items-center'
          )}
        >
          <div
            className={classNames(
              current === 0
                ? 'w-12 h-12'
                : 'w-12 h-12 flex justify-center border rounded-full hover:border-2 hover:border-primary'
            )}
          >
            <button
              onClick={goBackward}
              className={classNames(
                'flex items-center',
                current === 0 ? 'invisible' : 'visible'
              )}
            >
              <ArrowLeft />
            </button>
          </div>
          <motion.div
            style={{ height: 400, width: 800 }}
            className={classNames('flex justify-center mx-20')}
            key={carouselCards[current].id}
            initial={{
              opacity: 0,
              x: directionContext.direction === 'forward' ? '100%' : '-200%',
            }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{
              opacity: 0,
              x: directionContext.direction === 'forward' ? '-200%' : '0%',
            }}
            transition={{ duration: 0.5 }}
          >
            {carouselCards[current].component}
          </motion.div>
          <div
            className={classNames(
              current === carouselCards.length - 1
                ? 'w-12 h-12'
                : 'w-12 h-12 flex justify-center border rounded-full hover:border-2 hover:border-primary'
            )}
          >
            <button
              onClick={goForward}
              className={classNames(
                current === carouselCards.length - 1 ? 'invisible' : 'visible'
              )}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </SlideParent>
    </motion.div>
  );
};

export default CarouselSlide;