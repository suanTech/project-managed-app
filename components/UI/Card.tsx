import './Card.scss';

type CardType = {
  children: React.ReactNode,
  className?: string
}
export default function Card({children, className}: CardType): JSX.Element {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}
