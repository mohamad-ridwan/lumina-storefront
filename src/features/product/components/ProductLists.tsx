import { Shoe } from "@/types/shoes";
import ProductCard from "./ProductCard";

interface ProductListsProps {
  shoes: Shoe[];
}

const ProductLists = ({ shoes }: ProductListsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {shoes.map((shoe, key) => (
        <ProductCard
          key={key}
          slug={shoe.slug}
          image={shoe.image}
          name={shoe.name}
          price={shoe.price}
        />
      ))}
    </div>
  );
};

export default ProductLists;
