import TaskCard from "@/components/TaskCard";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { User } from "@prisma/client";

const getData = async (id: string) => {
  const { user } = (await getServerSession(authOptions)) as {
    user: Pick<User, "email" | "id">;
  };

  const project = await db.project.findFirst({
    where: { id, ownerId: user.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getData(params.id);

  return (
    <div className="h-full overflow-y-auto pr-6 w-full§">
      {/* @ts-expect-error Server Component */}
      <TaskCard tasks={project.tasks} title={project.name} />
    </div>
  );
}
