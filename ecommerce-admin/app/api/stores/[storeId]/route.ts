import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
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

    const { name } = await req.json();

    if (!name) {
      return Response.json(
        {
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!params.storeId) {
      return Response.json(
        {
          message: "Store ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const store = await prisma.store.updateMany({
      where: {
        userId,
        id: params.storeId,
      },
      data: {
        name,
      },
    });

    return Response.json(store);
  } catch (error) {
    console.error("store patch : ", error);

    return Response.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
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

    if (!params.storeId) {
      return Response.json(
        {
          message: "Store ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const store = await prisma.store.deleteMany({
      where: {
        userId,
        id: params.storeId,
      },
    });

    return Response.json(store);
  } catch (error) {
    console.error("store delete : ", error);

    return Response.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
