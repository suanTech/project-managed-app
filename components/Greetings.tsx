import { delay } from "@/lib/helper";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Card from "./UI/Card";
import Link from "next/link";
import Button from "./UI/Button";

const getUser = async () => {
  await delay(1000);
  const user = await getUserFromCookie(cookies());
  return user;
};

const Greetings = async () => {
  const user = await getUser();
  return (
    <Card type="primary" role="greetings">
      <div className="greetings-text">
        <div>
          <h1>Hello, {user?.firstName}!</h1>
          <p>Check your project's status and tasks!</p>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <Link href="/status">
            <Button size="medium">
              <p className="small">Check my tasks</p>
            </Button>
          </Link>
        </div>
      </div>
      <div className="greetings-banner"></div>
    </Card>
  );
};

export default Greetings;
