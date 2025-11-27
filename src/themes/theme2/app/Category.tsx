import { AppCategoryProps } from "@/core/domain/categories";
import ProductContent from "@/features/product/components/ProductContent";
import CustomBreadcrumb from "@/shared/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/shared/components/ContainerPage";

const CategoryPage = ({
  breadcrumbItems,
  shoes,
  label,
  sortParams,
  pagination,
  theme,
}: AppCategoryProps) => {
  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <ProductContent
        shoes={shoes}
        label={label}
        sortParams={sortParams}
        pagination={pagination}
        theme={theme as string}
      />
    </ContainerPage>
  );
};

export default CategoryPage;
