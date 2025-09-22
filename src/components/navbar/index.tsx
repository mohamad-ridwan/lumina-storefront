import { Category } from "@/types/categories";
import NavbarClient from "./NavbarClient";
import { fetchCategories } from "@/services/api/categories/getCategories";

const Navbar = async () => {
  const categories: Category[] = (await fetchCategories({
    level: "0",
  })) as Category[];
  return <NavbarClient categories={categories} />;
};

export default Navbar;
