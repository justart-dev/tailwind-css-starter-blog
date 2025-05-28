'use client'

import Link from './Link'
import React, { useRef, useState } from 'react'

interface Position {
  x: number
  y: number
}

interface SpotlightCardProps {
  title: string
  description: string
  href?: string
  className?: string
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  title,
  description,
  href,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.15)', // indigo color with low opacity
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState<number>(0)

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  return (
    <div className="group relative m-4 h-full">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/50 dark:hover:shadow-gray-900/20`}
      >
        {/* Spotlight effect */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />

        <div className="mb-4 flex items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>

        <div className="prose mb-2 flex-1 text-gray-600 dark:text-gray-300">
          {description.split('\n').map((line, index) => (
            <p key={index} className="mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </div>

        {href && (
          <div className="mt-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700"></div>
            <Link
              href={href}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:from-blue-700 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-500 dark:focus:ring-blue-800"
              aria-label={`View ${title}`}
            >
              Try It Out
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default SpotlightCard
