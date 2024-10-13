import prisma from "@/lib/prisma";
import ColorClient from "./components/ColorClient";
import { colorColumn } from "./components/columns";
import { format } from "date-fns";

const page = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedcolors: colorColumn[] = colors.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do,yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient colors={formattedcolors} />
      </div>
    </div>
  );
};

export default page;
