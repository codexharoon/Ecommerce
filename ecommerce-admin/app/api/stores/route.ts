import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Name is Required." },
        { status: 400 }
      );
    }

    const store = await prisma.store.create({
      data: {
        userId,
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("Stores Post : ", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
