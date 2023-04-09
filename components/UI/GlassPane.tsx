
export default function GlassPane({ children, className }: {children: React.ReactNode, className: string}) {
  return (
    <div className={`glass ${className}`}>
      {children}
    </div>
  )
}
