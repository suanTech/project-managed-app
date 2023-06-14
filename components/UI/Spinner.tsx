import './Spinner.css';

export default function Spinner({className}: {className?: string}) {
  return (
    <div className={`ring ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
