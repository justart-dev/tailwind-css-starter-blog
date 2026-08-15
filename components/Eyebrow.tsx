import { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  className?: string
}

const Eyebrow = ({ children, className = '' }: EyebrowProps) => {
  return <span className={`eyebrow ${className}`.trim()}>{children}</span>
}

export default Eyebrow
