import { Shoe } from "@/types/shoes";
import WrapperSection from "../WrapperSection";
import ProductLists from "@/components/ProductLists";

interface ProductListsProps {
  shoes: Shoe[];
  label: string;
}

const ProductContent = ({ shoes, label }: ProductListsProps) => {
  return (
    <WrapperSection title={label}>
      <ProductLists shoes={shoes} />
    </WrapperSection>
  );
};

export default ProductContent;
