import { Category } from "@/shared/types/categories";
import NavbarClient from "./NavbarClient";
import { fetchCategories } from "@/core/infrastructure/repositories/categoryRepository";

const Navbar = async () => {
  try {
    const categories: Category[] = (await fetchCategories({
      level: "0",
    })) as Category[];
    return <NavbarClient categories={categories} />;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return <NavbarClient categories={[]} />;
  }
};

export default Navbar;