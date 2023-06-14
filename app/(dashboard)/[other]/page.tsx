import Card from "@/components/UI/Card";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div style={{width: '95%', margin: 'auto'}}>
      <Card type="primary">
        <h2>Work in progress</h2>
      <Link href={"/home"}><p className="warning">Go back to dashboard</p></Link>
    </Card>
    </div>
  );
}
