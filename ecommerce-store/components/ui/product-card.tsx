"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";

interface ProductCardProps {
  data: Product;
}

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <div className="bg-white group cursor-pointer space-y-4 p-3 border rounded-xl">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          alt="image"
          src={data.images[0].url}
          fill
          className="object-cover rounded-md aspect-square"
        />

        <div className="opacity-0 group-hover:opacity-100 transition w-full px-6 absolute bottom-5">
          <div className="flex justify-center gap-x-6">
            <IconButton icon={<Expand size={20} className="text-gray-600" />} />
            <IconButton
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className=" text-sm text-gray-500">{data.category.name}</p>
      </div>

      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
    </div>
  );
};

export default ProductCard;
