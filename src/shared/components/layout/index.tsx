import { Category } from "@/core/domain/categories";
import NavbarClient from "./NavbarClient";
import { categoriesRepositoryImpl } from "@/core/infrastructure/repositories/impl/categories";

const { getCategories } = categoriesRepositoryImpl;

const Navbar = async () => {
  const categories: Category[] = (await getCategories({
    level: "0",
  })) as Category[];
  return <NavbarClient categories={categories} />;
};

export default Navbar;
