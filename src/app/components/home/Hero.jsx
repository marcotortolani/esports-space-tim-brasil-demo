'use client'
import { forwardRef } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Decorator } from '../ui/Decorator'

import dictionary from '@/dictionary/lang.json'

// Componente ArrowLineIcon con forwardRef
const ArrowLineIcon = forwardRef(
  ({ fill = '#0000', stroke = '#FFF', strokeWidth = '10' }, ref) => (
    <svg
      width="100%"
      height="100%"
      viewBox="-15.36 -15.36 542.72 542.72"
      transform="matrix(-1, 0, 0, 1, 0, 0)"
      fill={fill}
    >
      <polygon
        ref={ref}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        points="419.916,71.821 348.084,0 92.084,256.005 348.084,512 419.916,440.178 235.742,256.005"
      />
    </svg>
  )
)

ArrowLineIcon.displayName = 'ArrowLineIcon'

// Crear el componente animado con Framer Motion
const MotionArrowLineIcon = motion.create(ArrowLineIcon)

function ArrowsGroup({ className = 'bottom-20 w-56 h-20' }) {
  // Definimos la animación como una secuencia de estados para cada flecha
  const fillAnimation = {
    fill: ['#0000', '#FFF', '#0000'], // Ciclo: transparente -> blanco -> transparente
    stroke: ['#BABABA', '#FFF', '#BABABA'], // Ciclo: gris -> blanco -> gris
  }

  // Duración total del ciclo (para que las tres flechas completen su animación)
  const cycleDuration = 3 // 3 segundos para el ciclo completo

  return (
    <div className={`absolute ` + className}>
      {/* Flecha 1 */}
      <div className="absolute left-0 translate-x-0 h-full">
        <MotionArrowLineIcon
          initial={{ fill: 'transparent', stroke: '#BABABA' }}
          animate={fillAnimation}
          transition={{
            fill: {
              times: [0, 0.1, 0.3], // La flecha 1 se ilumina rápido y luego vuelve a transparente
              duration: cycleDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            stroke: {
              times: [0, 0.1, 0.3],
              duration: cycleDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      </div>

      {/* Flecha 2 */}
      <div className="absolute left-0 translate-x-[50%] h-full">
        <MotionArrowLineIcon
          initial={{ fill: 'transparent', stroke: '#BABABA' }}
          animate={fillAnimation}
          transition={{
            fill: {
              times: [0.3, 0.4, 0.6], // La flecha 2 se ilumina después de la flecha 1
              duration: cycleDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            stroke: {
              times: [0.3, 0.4, 0.6],
              duration: cycleDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      </div>

      {/* Flecha 3 */}
      <div className="absolute left-0 translate-x-[100%] h-full">
        <MotionArrowLineIcon
          initial={{ fill: 'transparent', stroke: '#BABABA' }}
          animate={fillAnimation}
          transition={{
            fill: {
              times: [0.6, 0.7, 0.9], // La flecha 3 se ilumina después de la flecha 2
              duration: cycleDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            stroke: {
              times: [0.6, 0.7, 0.9],
              duration: cycleDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="w-full h-fit lg:h-[86dvh] mt-20 mb-10 lg:mb-40 lg:mt-10 flex flex-col xl:flex-row items-center justify-around">
      <div className="relative xl:w-[45%] h-full xl:pb-40 flex items-center justify-start">
        <h2 className="font-countachBoldItalic tracking-widest text-center lg:text-left animate-pulse text-White text-5xl xs:text-6xl md:text-[6rem] md:leading-[6rem] xl:text-[8rem] xl:leading-[7.5rem]">
          {dictionary['Dive']}
          <br /> {dictionary['into']}{' '}
          <span className="text-Primary">{dictionary['the world']}</span>
          <br /> {dictionary['of the']}{' '}
          <span className="text-Primary">{dictionary['Gaming']}</span>
        </h2>
        <ArrowsGroup className="hidden xl:flex left-0 translate-x-0 bottom-20 w-40 h-20 opacity-70" />
      </div>

      <div className="relative w-full xl:w-[55%] h-full flex">
        <ArrowsGroup className="hidden xl:flex right-0 translate-x-0 top-0 w-20 h-8 rotate-180" />
        <div className="relative w-full h-full flex flex-col items-center xl:items-start justify-center gap-5">
          <div className="relative h-4/5 aspect-[6/7] md:aspect-[4/5] lg:h-[50dvh] lg:aspect-[5/6] xl:h-4/5 xl:aspect-[4/5] overflow-hidden">
            <Image
              className="w-full h-auto md:w-auto lg:w-full xl:h-full object-cover object-top"
              src="/assets/img/hero-gamer.webp"
              alt="Hero"
              width={1920}
              height={1080}
            />
            <div className="absolute bottom-0 left-0 translate-x-0 lg:translate-x-7 translate-y-0 w-full">
              <Decorator
                solid={true}
                className="w-2/3 lg:w-[55%] h-5 lg:h-7 xl:h-8"
              />
            </div>
          </div>

          <div className="relative xl:absolute xl:top-0 xl:right-0 xl:translate-y-[60%] xl:translate-x-[50%] w-full flex flex-col items-center xl:items-start gap-8 font-montserrat text-white">
            <Decorator className="hidden xl:flex w-[200px] animate-pulse" />
            <p className="w-full px-2 md:max-w-[500px] lg:max-w-[650px] xl:max-w-[450px] mx-auto xl:mx-0 text-center xl:text-left font-light text-lg lg:text-3xl xl:text-xl">
              {
                dictionary[
                  'Explore the best of Gaming with news, guides, and exclusive tournaments. Connect with a passionate community and take your game to the next level.'
                ]
              }
            </p>
            <p className="w-4/5 mx-auto xl:mx-0 font-poppins tracking-wide text-center xl:text-left italic text-2xl lg:text-3xl xl:text-2xl font-bold xl:font-medium">
              {dictionary['Join and live the gamer experience!']}
            </p>
            <Decorator className="flex xl:hidden w-[120px] lg:w-[200px] mr-4 h-6 lg:h-8 lg:mr-8 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
