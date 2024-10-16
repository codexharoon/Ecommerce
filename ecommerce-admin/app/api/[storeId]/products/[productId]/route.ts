import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
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

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
    });

    if (!product) {
      return Response.json(
        {
          message: "product not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.log("product get : ", error);
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
  { params }: { params: { storeId: string; productId: string } }
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

    const {
      name,
      price,
      images,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
    } = await req.json();

    if (!name || !price || !categoryId || !sizeId || !colorId) {
      return Response.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    if (!images || !images.length) {
      return Response.json(
        {
          message: "At least one image is required",
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

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (!product) {
      return Response.json(
        {
          message: "product not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.product.update({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
      },
    });

    const updatedproduct = await prisma.product.update({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return Response.json(
      {
        message: "product updated successfully",
        product: updatedproduct,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("product patch : ", error);
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
  { params }: { params: { storeId: string; productId: string } }
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

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (!product) {
      return Response.json(
        {
          message: "product not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.product.deleteMany({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    return Response.json(
      {
        message: "product deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("product delete : ", error);
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
