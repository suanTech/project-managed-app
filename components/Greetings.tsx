import { delay } from "@/lib/helper";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Button from "./UI/Button";
import Card from "./UI/Card";

const getUser = async () => {
  await delay(1000);
  const user = await getUserFromCookie(cookies());
  return user;
};

const Greetings = async () => {
  const user = await getUser();
  return (
    <Card className="greetings">
      <div className="greetings-text">
        <div>
          <h1>Hello, {user?.firstName}!</h1>
          <p>Check your daily tasks and schedule</p>
        </div>
        <div style={{marginTop: '1rem'}}>
          <Button className="primary medium">
            <p className="small">Today's Schedule</p>
          </Button>
        </div>
      </div>
      <div className="greetings-banner"></div>
    </Card>
  );
};

export default Greetings;
