import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import {cookies} from "next/headers";
import Button from "./UI/Button";
import Card from "./UI/Card";

const getUser = async () => {
  await delay(5000);
  const user = await getUserFromCookie(cookies());
  return user;
}

const Greetings = async() => {
  const user = await getUser();
  return (
    <Card>
      <div>
        <h1>Hello, {user?.firstName}!</h1>
        <p>Check your daily tasks and schedule</p>
        <Button className="primary medium">Today's Schedule</Button>
      </div>
    </Card>
  );
}

export default Greetings;