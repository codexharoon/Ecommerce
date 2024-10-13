import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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

    const size = await prisma.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    if (!size) {
      return Response.json(
        {
          message: "size not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(size);
  } catch (error) {
    console.log("size get : ", error);
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
  { params }: { params: { storeId: string; sizeId: string } }
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

    const size = await prisma.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    if (!size) {
      return Response.json(
        {
          message: "size not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedsize = await prisma.size.updateMany({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });

    return Response.json(
      {
        message: "size updated successfully",
        size: updatedsize,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("size patch : ", error);
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
  { params }: { params: { storeId: string; sizeId: string } }
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

    const size = await prisma.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    if (!size) {
      return Response.json(
        {
          message: "size not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.size.deleteMany({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });

    return Response.json(
      {
        message: "size deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("size delete : ", error);
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
