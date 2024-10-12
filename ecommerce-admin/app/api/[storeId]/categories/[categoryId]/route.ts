import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
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

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    if (!category) {
      return Response.json(
        {
          message: "category not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(category);
  } catch (error) {
    console.log("category get : ", error);
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
  { params }: { params: { storeId: string; categoryId: string } }
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

    const { name, billboardId } = await req.json();

    if (!name || !billboardId) {
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

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    if (!category) {
      return Response.json(
        {
          message: "category not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedCategory = await prisma.category.updateMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return Response.json(
      {
        message: "category updated successfully",
        category: updatedCategory,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("category patch : ", error);
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
  { params }: { params: { storeId: string; categoryId: string } }
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

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    if (!category) {
      return Response.json(
        {
          message: "category not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.category.deleteMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
    });

    return Response.json(
      {
        message: "category deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("category delete : ", error);
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
