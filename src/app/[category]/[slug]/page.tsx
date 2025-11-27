import { getCategories } from "@/core/usecases/categories";
import { getShoe } from "@/core/usecases/product";
import { Category, ParentCategory } from "@/types/categories";
import { Shoe, ShoesResponse } from "@/types/shoes";
import { loadThemeComponent } from "@/shared/lib/Theme";
import { getTheme } from "@/core/infrastructure/services/api/theme";
import { AppCategoryProps } from "@/core/domain/categories";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { category, slug } = await params;
  const { page, sort } = await searchParams;

  let isValidParams: boolean = true;
  let levelCategory: "0" | "1" | undefined;
  const paramsCurrently: string[] = ["c1", "c2"];

  if (category === "c1") {
    levelCategory = "0";
  } else if (category === "c2") {
    levelCategory = "1";
  }

  const categoryData = (await getCategories({
    slug,
    level: levelCategory,
  })) as Category;

  if (!paramsCurrently.some((p) => p === category)) {
    isValidParams = false;
  }
  if (!isValidParams || !categoryData?._id) {
    return null;
  }

  const shoeData: ShoesResponse = await getShoe({
    categoryId: categoryData._id,
    limit: 20,
    page: page ? Number(page) : undefined,
    sort: (sort as "termahal") ?? undefined,
  });
  const shoes: Shoe[] = shoeData.shoes;

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
  const theme = await getTheme();
  const CategoryPage = await loadThemeComponent<AppCategoryProps>(
    theme,
    "CategoryPage"
  );

  return (
    <CategoryPage
      breadcrumbItems={breadcrumbItems}
      shoes={shoes}
      label={categoryData.name}
      sortParams={sort as string}
      pagination={{
        limit: shoeData.limit,
        totalPages: shoeData.totalPages,
        total: shoeData.total,
        currentPage: shoeData.currentPage,
      }}
      theme={theme}
    />
  );
};

export default CategoryPage;
