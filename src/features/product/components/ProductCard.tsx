import BaseCard from "@/shared/components/card/BaseCard";
import Link from "next/link";

interface Props {
  key: number;
  slug: string;
  image: string;
  name: string;
  price: number;
}

const ProductCard: React.FC<Props> = ({ key, slug, image, name, price }) => {
  return (
    <Link key={key} href={`/product/${slug}`} className="w-fit h-fit">
      <BaseCard
        wrapperCard="justify-start items-start"
        image={image}
        title={name}
        titleClassName="text-sm font-normal text-foreground"
        descriptionClassName="text-sm text-black font-semibold"
        description={
          price
            ? `<small>Rp</small>${price.toLocaleString("id-ID")}`
            : "Harga tidak tersedia"
        }
        wrapperImgClassName="rounded-lg w-full sm:h-[200px] lg:h-[150px] xl:h-[180px]"
        imgHeight={280}
        imgWidth={280}
        imageClassName="h-full w-full rounded-lg object-cover"
      />
    </Link>
  );
};

export default ProductCard;
