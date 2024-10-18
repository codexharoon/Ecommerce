"use client";

import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  orders: OrderColumn[];
}

const BillboardClient = ({ orders }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${orders.length})`}
        description="Manage orders for your store"
      />

      <Separator />

      <DataTable searchKey="products" columns={columns} data={orders} />
    </>
  );
};

export default BillboardClient;
