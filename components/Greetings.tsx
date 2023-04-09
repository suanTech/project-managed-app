import { delay } from "@/lib/helper";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Button from "./UI/Button";
import Card from "./UI/Card";

const getUser = async () => {
  await delay(4000);
  const user = await getUserFromCookie(cookies());
  return user;
};

const Greetings = async () => {
  const user = await getUser();
  return (
    <Card className="greetings">
      <div>
        <div>
          <h1>Hello, {user?.firstName}!</h1>
          <p className="small">Check your daily tasks and schedule</p>
        </div>
        <div>
          <Button className="primary small">
            <p className="small">Today's Schedule</p>
          </Button>
        </div>
      </div>
      <div className="bannerImage"></div>
    </Card>
  );
};

export default Greetings;
