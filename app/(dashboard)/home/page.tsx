import Greetings from "@/components/Greetings";
import Shimmer from "@/components/GreetingsSkeleton";
import { Suspense } from "react";

import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { User } from "@prisma/client";
import TaskCard from "@/components/TaskCard";
import NewProject from "@/components/NewProject";

const getData = async () => {
  const { user } = (await getServerSession(authOptions)) as {
    user: Pick<User, "email" | "id">;
  };
  const projects = await db.project.findMany({
    where: {
      ownerId: user.id,
    },
    include: {
      tasks: true,
    },
  });
  return projects;
};

export default async function Page() {
  const projects = await getData();
  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<Shimmer />}>
            {/* @ts-expect-error Server Component */}
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {projects.map((project) => (
            <div className="w-1/3 p-3">
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            {/* @ts-expect-error Server Component */}
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}
