import styles from './GlassPane.module.scss';

export default function GlassPane({ children, className }: {children: React.ReactNode, className: string}) {
  return (
    <div className={`${styles.div} glass ${className}`}>
      {children}
    </div>
  )
}
