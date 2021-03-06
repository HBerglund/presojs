import React, { FC, Fragment, useContext } from 'react';
import { PresentationContext } from '../Context/PresentationContext';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import AnimatedText from '../Components/AnimatedText';
import SlideParent from '../Components/SlideParent';
import Image from '../Components/Image';
import BlurBlob from '../Components/BlurBlob';

interface ChapterSlideProps {
  alignXY?: 'left' | 'center';
  chapter: number;
  title?: string;
  subTitle?: string;
  imageUrl?: string;
  disableAnimations?: boolean;
  langSwe?: boolean;
}

/**
 * @property {string} alignXY - Position of content ('left' | 'center') (optional).
 * @property {string} chapter - Number icon to show current chapter.
 * @property {string} title - Title displayed text-lg and text-textPrimary color (optional).
 * @property {string} subTitle - Sub title displayed text-lg and text-textPrimary color (optional).
 * @property {string} imageUrl - Url address for the image (optional).
 * @property {string} disableAnimations - If true, no text animations are shown for any text (optional).
 * @property {boolean} langSwe - If true, static text inside the slide is displayed in Swedish (optional).
 */
const ChapterSlide: FC<ChapterSlideProps> = ({
  alignXY,
  chapter,
  title,
  subTitle,
  imageUrl,
  disableAnimations,
  langSwe,
}: ChapterSlideProps) => {
  const presentationContext = useContext(PresentationContext);
  const chapterAnimation = {
    visible: {
      opacity: 1,
      x: presentationContext.direction === 'forward' ? '1200' : '-600',
      transition: {
        duration: presentationContext.direction === 'forward' ? '0.8' : '1',
      },
    },
    hidden: { opacity: 0, x: 0 },
  };
  const chapterImageAnimation = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, delay: 0.25 },
    },
    hidden: { opacity: 0, scale: 0.6 },
  };

  return (
    <Fragment>
      <SlideParent>
        <div
          className={classNames(
            `w-full flex ${
              alignXY !== 'left' ? 'justify-center' : 'justify-between'
            }`
          )}
        >
          <div
            className={classNames(
              `flex flex-col items-${alignXY} hover:cursor-default`
            )}
          >
            <div className={classNames('my-8')}>
              <motion.div
                className={classNames('flex flex-row items-center')}
                key={chapter}
                variants={chapterAnimation}
                initial='hidden'
                animate='visible'
              >
                {chapter && (
                  <Fragment>
                    <span
                      className={classNames(
                        'text-textPrimary bodySans text-xs mr-4'
                      )}
                    >
                      {langSwe ? 'Kapitel' : 'Chapter'}
                    </span>
                    <div
                      className={classNames(
                        'w-11 h-11 p-0.5 flex justify-center items-center bg-gradient-to-l from-primary to-secondary rounded-full'
                      )}
                    >
                      <div
                        className={classNames(
                          'w-full h-full flex justify-center items-center bg-black rounded-full'
                        )}
                      >
                        <span
                          className={classNames(
                            'text-textPrimary serifHeading text-center text-xs leading-none mt-1 mb-[10px] mr-[1px]'
                          )}
                        >
                          {chapter}
                        </span>
                      </div>
                    </div>
                  </Fragment>
                )}
              </motion.div>
            </div>
            {title && (
              <AnimatedText
                disableAnimations={disableAnimations}
                className='text-textPrimary text-lg serifHeading'
                splitOn='words'
                staggerChildren
                animation='bottom'
                delay={0.5}
              >
                {title}
              </AnimatedText>
            )}
            {subTitle && (
              <AnimatedText
                disableAnimations={disableAnimations}
                className='text-textPrimary text-lg sansHeading'
                splitOn='chars'
                staggerChildren
                animation='bottom'
                delay={0.75}
              >
                {subTitle}
              </AnimatedText>
            )}
          </div>
          {alignXY === 'left' && (
            <motion.div
              key={imageUrl}
              variants={chapterImageAnimation}
              initial='hidden'
              animate='visible'
            >
              {imageUrl && <Image imageUrl={imageUrl} border size='lg' />}
            </motion.div>
          )}
        </div>
      </SlideParent>
      <BlurBlob position={1} size='large' color='tertiary' />
      <BlurBlob position={3} size='small' color='primary' />
    </Fragment>
  );
};

export default ChapterSlide;
