import WrapperSection from "@/sections/WrapperSection";
import { fetchCategories } from "@/services/api/categories/getCategories";
import { Category } from "@/types/categories";

const PopularCategories = async () => {
  const categories: Category[] = await fetchCategories();
  return <WrapperSection title="Popular categories"></WrapperSection>;
};

export default PopularCategories;
