import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

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

    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        storeId: params.storeId,
      },
    });

    return Response.json(
      {
        message: "Product created successfully",
        product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("product post : ", error);
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
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const categoryId = req.nextUrl.searchParams.get("categoryId") || undefined;
    const sizeId = req.nextUrl.searchParams.get("sizeId") || undefined;
    const colorId = req.nextUrl.searchParams.get("colorId") || undefined;
    const isFeatured = req.nextUrl.searchParams.get("isFeatured") || undefined;

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

    const products = await prisma.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(products);
  } catch (error) {
    console.log("products get : ", error);
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
