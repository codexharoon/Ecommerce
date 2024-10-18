import prisma from "@/lib/prisma";
import OrderClient from "./components/OrderClient";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import { priceFormatter } from "@/lib/utils";

const page = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedorders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    isPaid: order.isPaid,
    phone: order.phone,
    address: order.address,
    totalPrice: priceFormatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    products: order.orderItems.map((item) => item.product.name).join(", "),
    createdAt: format(order.createdAt, "MMMM do,yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient orders={formattedorders} />
      </div>
    </div>
  );
};

export default page;
