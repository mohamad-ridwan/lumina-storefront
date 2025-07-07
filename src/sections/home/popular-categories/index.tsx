import BaseCard from "@/components/card/BaseCard";
import WrapperSection from "@/sections/WrapperSection";
import { fetchCategories } from "@/services/api/categories/getCategories";
import { Category } from "@/types/categories";

const PopularCategories = async () => {
  const categories: Category[] = await fetchCategories({ limit: 6 });
  if (!categories?.length) {
    return null;
  }
  return (
    <WrapperSection title="Popular categories">
      <div className="grid grid-cols-2 min-[400px]:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((ctg, key) => (
          <BaseCard
            key={key}
            wrapperCard="justify-center items-center"
            image={ctg.imageUrl}
            title={ctg.name}
            wrapperImgClassName="rounded-full w-fit"
            imgHeight={324}
            imgWidth={324}
            imageClassName="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover"
          />
        ))}
      </div>
    </WrapperSection>
  );
};

export default PopularCategories;
