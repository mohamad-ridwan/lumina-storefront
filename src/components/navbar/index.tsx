import { Category } from "@/types/categories";
import NavbarClient from "./NavbarClient";
import { fetchCategories } from "@/services/api/categories/getCategories";

const Navbar = async () => {
  const categories: Category[] = await fetchCategories({});
  return <NavbarClient categories={categories} />;
};

export default Navbar;
