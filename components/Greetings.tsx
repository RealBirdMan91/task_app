import Button from "./Button";
import Card from "./Card";
import { delay } from "@/lib/aync";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@prisma/client";

const getData = async () => {
  await delay(5000);
  const { user } = (await getServerSession(authOptions)) as {
    user: Pick<User, "email" | "id">;
  };

  return user;
};

const Greetings = async () => {
  const user = await getData();

  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user.email}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large">Today's Schedule</Button>
      </div>
    </Card>
  );
};

export default Greetings;
