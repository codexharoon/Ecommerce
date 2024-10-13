import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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

    const color = await prisma.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    if (!color) {
      return Response.json(
        {
          message: "color not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(color);
  } catch (error) {
    console.log("color get : ", error);
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

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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

    const color = await prisma.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    if (!color) {
      return Response.json(
        {
          message: "color not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedcolor = await prisma.color.updateMany({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });

    return Response.json(
      {
        message: "color updated successfully",
        color: updatedcolor,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("color patch : ", error);
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

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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

    const color = await prisma.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    if (!color) {
      return Response.json(
        {
          message: "color not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.color.deleteMany({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
    });

    return Response.json(
      {
        message: "color deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("color delete : ", error);
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
