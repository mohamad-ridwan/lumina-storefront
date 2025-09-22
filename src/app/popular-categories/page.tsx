import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import BaseCard from "@/components/card/BaseCard";
import ContainerPage from "@/container/ContainerPage";
import WrapperSection from "@/sections/WrapperSection";
import { fetchCategories } from "@/services/api/categories/getCategories";
import { Category } from "@/types/categories";
import Link from "next/link";

const PopularCategories = async () => {
  const categories: Category[] = (await fetchCategories({
    isPopular: true,
  })) as Category[];

  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    {
      href: "/popular-categories",
      label: "Popular Categories",
      isCurrent: true,
    },
  ];
  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <WrapperSection title="Popular categories">
        <div className="grid grid-cols-2 min-[400px]:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((ctg, key) => (
            <Link
              key={key}
              href={ctg.level === 0 ? `/c1/${ctg.slug}` : `/c2/${ctg.slug}`}
              className="w-fit"
            >
              <BaseCard
                wrapperCard="justify-center items-center"
                image={ctg.imageUrl}
                title={ctg.name}
                wrapperImgClassName="rounded-full w-fit"
                imgHeight={324}
                imgWidth={324}
                imageClassName="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover"
              />
            </Link>
          ))}
        </div>
      </WrapperSection>
    </ContainerPage>
  );
};

export default PopularCategories;
