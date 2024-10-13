import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { name, value } = await req.json();

    if (!name || !value) {
      return Response.json(
        {
          message: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!store) {
      return Response.json(
        {
          message: "Store not found",
        },
        {
          status: 404,
        }
      );
    }

    const size = await prisma.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return Response.json(
      {
        message: "Size created successfully",
        size,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("size post : ", error);
    return Response.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
      },
    });

    if (!store) {
      return Response.json(
        {
          message: "Store not found",
        },
        {
          status: 404,
        }
      );
    }

    const sizes = await prisma.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return Response.json(sizes);
  } catch (error) {
    console.log("sizes get : ", error);
    return Response.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
