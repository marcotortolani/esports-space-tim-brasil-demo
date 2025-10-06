'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

export default function Background() {
  const [glowIntensity, setGlowIntensity] = useState(1)

  // Posiciones iniciales y colores de los círculos
  const lights = [
    { id: 1, color: 'from-pink-500 to-purple-500', x: 10, y: 10 },
    { id: 2, color: 'from-purple-500 to-blue-500', x: 50, y: 20 },
    { id: 3, color: 'from-pink-500 to-red-500', x: 30, y: 70 },
    { id: 4, color: 'from-blue-500 to-purple-500', x: 60, y: 50 },
    { id: 5, color: 'from-pink-500 to-blue-500', x: 40, y: 40 },
    { id: 6, color: 'from-blue-500 to-pink-500', x: 70, y: 80 },
    { id: 7, color: 'from-pink-500 to-blue-500', x: 20, y: 30 },
    { id: 8, color: 'from-purple-500 to-pink-500', x: 90, y: 60 },
  ]

  // Cambiar la intensidad del brillo
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(Math.random() * 1 + 0.5) // Varía entre 0.5 y 1.5
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="-z-50 fixed top-0 w-screen h-screen bg-black overflow-hidden opacity-100">
      {/* Imagen de fondo */}
      <div className="absolute top-0 z-0 w-full h-full">
        <Image
          src="/assets/Fondo/Fondo1.webp"
          alt="Background Image"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </div>

      {/* Círculos animados */}
      {lights.map((light, i) => (
        <motion.div
          key={light.id}
          className={`absolute z-10 w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-r ${light.color} opacity-50 blur-3xl`}
          style={{
            left: `${light.x}%`, // Posición inicial en porcentaje
            top: `${light.y}%`, // Posición inicial en porcentaje
            boxShadow: `0 0 ${glowIntensity * 20 * i}px ${
              glowIntensity * 20
            }px rgba(255, 255, 255, ${glowIntensity * 0.5})`,
          }}
          initial={{
            x: 0,
            y: 0,
          }}
          animate={{
            x: [-20, 20, -20], // Movimiento suave en el eje X (en píxeles)
            y: [-20, 20, -20], // Movimiento suave en el eje Y (en píxeles)
            scale: [1, 1.2, 1], // Efecto de "pulso"
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 5 + Math.random() * 3, // Duración aleatoria para cada luz
              ease: 'easeInOut', // Movimiento más suave
            },
            y: {
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 5 + Math.random() * 3,
              ease: 'easeInOut',
            },
            scale: {
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  )
}
