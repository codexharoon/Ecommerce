"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ProductClientProps {
  products: ProductColumn[];
}

const ProductClient = ({ products }: ProductClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage products for your store"
        />

        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 size-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={products} />

      <Heading title="API" description="API calls for products" />

      <Separator />

      <ApiList entityName="products" entityId="<productId>" />
    </>
  );
};

export default ProductClient;
