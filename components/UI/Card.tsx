import './Card.scss';

export default function Card({children, className}: {children: React.ReactNode, className: string}) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}
