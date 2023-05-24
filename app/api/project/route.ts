import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

interface IProject extends NextRequest {
  json: () => Promise<{ name: string }>;
}

export async function POST(request: IProject) {
  const data = await getServerSession(authOptions);
  const { name } = await request.json();
  if (!data) {
    throw new Error("User not found");
  }

  const project = await db.project.create({
    data: {
      name: name,
      owner: {
        connect: {
          id: data.user.id,
        },
      },
    },
  });

  return NextResponse.json(project);
}
