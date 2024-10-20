import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/container";
import Gallery from "@/components/gallery/index";
import Info from "@/components/Info";

const page = async ({ params }: { params: { productId: string } }) => {
  const product = await getProduct(params.productId);

  const relatedProducts = await getProducts({
    isFeatured: true,
    categoryId: product.category.id,
  });
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-2 md:items-start md:gap-x-8">
            <Gallery images={product.images} />

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>

          <hr className="my-10" />

          <ProductList title="Related Products" items={relatedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default page;
