import { Category } from "@/types/categories";
import NavbarClient from "./NavbarClient";
import { getCategories } from "@/core/usecases/categories";

const Navbar = async () => {
  const categories: Category[] = (await getCategories({
    level: "0",
  })) as Category[];
  return <NavbarClient categories={categories} />;
};

export default Navbar;
