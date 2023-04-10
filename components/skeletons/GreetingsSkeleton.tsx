import Card from "../UI/Card";
import Skeleton from "./Skeleton";

export default function GreetingsSkeleton() {
  return (
    <Card className="skeleton-card">
      <div>
        <Skeleton classes='title width-100'/>
        <Skeleton classes='text width-100'/>
      </div>
      <div>
        <Skeleton classes='button width-50'/>
      </div>
    </Card>
  );
}
