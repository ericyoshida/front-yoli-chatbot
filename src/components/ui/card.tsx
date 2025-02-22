import * as React from 'react'

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`shadow-md rounded-lg p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'
