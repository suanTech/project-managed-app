import './Skeleton.scss';

export default function Skeleton({classes}: {classes: string}) {
  const classNames = `skeleton ${classes} animate-pulse`
  return <div className={classNames}></div>
}
