import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import CategoryClient from "@/sections/category";
import { fetchCategories } from "@/services/api/categories/getCategories";
import { getShoe } from "@/services/api/shoes/getShoe";
import { Category, ParentCategory } from "@/types/categories";
import { Shoe } from "@/types/shoes";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}) => {
  const { category, slug } = await params;
  let isValidParams: boolean = true;
  let levelCategory: "0" | "1" | undefined;
  const paramsCurrently: string[] = ["c1", "c2"];

  if (category === "c1") {
    levelCategory = "0";
  } else if (category === "c2") {
    levelCategory = "1";
  }

  const categoryData = (await fetchCategories({
    slug,
    level: levelCategory,
  })) as Category;

  if (!paramsCurrently.some((p) => p === category)) {
    isValidParams = false;
  }
  if (!isValidParams || !categoryData?._id) {
    return null;
  }

  const shoes: Shoe[] = await getShoe({ categoryId: categoryData._id });

  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/categories", label: "Category" },
    {
      href: `/${category}/${slug}`,
      label: categoryData.name,
      isCurrent: true,
    },
  ];
  if (category === "c2") {
    breadcrumbItems.splice(2, 0, {
      href: `/c1/${(categoryData.parentCategory as ParentCategory).slug}`,
      label: (categoryData.parentCategory as ParentCategory).name,
    });
  }
  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <CategoryClient title={categoryData.name} shoes={shoes} />
    </ContainerPage>
  );
};

export default CategoryPage;
