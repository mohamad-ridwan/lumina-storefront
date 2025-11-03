import { Shoe } from "@/types/shoes";
import BaseCard from "./card/BaseCard";
import Link from "next/link";

interface ProductListsProps {
  shoes: Shoe[];
}

const ProductLists = ({ shoes }: ProductListsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {shoes.map((shoe, key) => (
        <Link key={key} href={`/product/${shoe.slug}`} className="w-fit h-fit">
          <BaseCard
            wrapperCard="justify-start items-start"
            image={shoe.image}
            title={shoe.name}
            titleClassName="text-sm font-normal text-foreground"
            descriptionClassName="text-sm text-black font-semibold"
            description={
              shoe.price
                ? `<small>Rp</small>${shoe.price.toLocaleString("id-ID")}`
                : "Harga tidak tersedia"
            }
            wrapperImgClassName="rounded-lg w-full sm:h-[200px] lg:h-[150px] xl:h-[180px]"
            imgHeight={280}
            imgWidth={280}
            imageClassName="h-full w-full rounded-lg object-cover"
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductLists;
