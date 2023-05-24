import { db } from "@/lib/db";
import { TASK_STATUS, Task, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import Button from "./Button";
import Card from "./Card";
import { authOptions } from "@/lib/auth";

const getData = async () => {
  const { user } = (await getServerSession(authOptions)) as {
    user: Pick<User, "email" | "id">;
  };

  const tasks = await db.task.findMany({
    where: {
      ownerId: user.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};
type Tasks = Task[];

const TaskCard = async ({
  title,
  tasks,
}: {
  title?: string;
  tasks?: Tasks;
}) => {
  const data = tasks || (await getData());

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button variant="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div className="py-2 ">
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
