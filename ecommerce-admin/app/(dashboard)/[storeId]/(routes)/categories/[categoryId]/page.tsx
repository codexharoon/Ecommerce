import prisma from "@/lib/prisma";
import BillboardForm from "./components/category-form";

const page = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const categories = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={categories} billboards={billboards} />
      </div>
    </div>
  );
};

export default page;
