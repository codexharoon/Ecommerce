import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
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

    const billboard = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    if (!billboard) {
      return Response.json(
        {
          message: "Billboard not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(billboard);
  } catch (error) {
    console.log("billboard get : ", error);
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
  { params }: { params: { storeId: string; billboardId: string } }
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

    const { label, imageUrl } = await req.json();

    if (!label || !imageUrl) {
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

    const billboard = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    if (!billboard) {
      return Response.json(
        {
          message: "Billboard not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedBillboard = await prisma.billboard.updateMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return Response.json(
      {
        message: "Billboard updated successfully",
        billboard: updatedBillboard,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("billboard patch : ", error);
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
  { params }: { params: { storeId: string; billboardId: string } }
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

    const billboard = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    if (!billboard) {
      return Response.json(
        {
          message: "Billboard not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.billboard.deleteMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
    });

    return Response.json(
      {
        message: "Billboard deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("billboard delete : ", error);
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
