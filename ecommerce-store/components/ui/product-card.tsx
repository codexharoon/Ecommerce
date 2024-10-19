"use client";

import { Product } from "@/types";
import Image from "next/image";

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
      </div>
      ProductCard
    </div>
  );
};

export default ProductCard;
