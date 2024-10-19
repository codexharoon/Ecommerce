import { Product } from "@/types";
import qs from "query-string";

const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const newUrl = qs.stringifyUrl({
    url,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
    },
  });
  const res = await fetch(newUrl);

  return res.json();
};

export default getProducts;
