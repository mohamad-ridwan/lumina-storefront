import { LatestOffer } from "@/types/latestOffers";
import WrapperSection from "../WrapperSection";
import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import Image from "next/image";

interface HeaderProps {
  offers: LatestOffer;
}

const Header = ({ offers }: HeaderProps) => {
  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/latest-offers", label: "Latest Offers" },
    {
      href: "",
      label: offers.title,
      isCurrent: true,
    },
  ];
  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />
      <WrapperSection>
        <Image
          src={offers.imageUrl}
          height={380}
          width={1920}
          alt={offers.label}
          className="max-h-[300px] max-w-full object-cover"
        />
      </WrapperSection>
    </>
  );
};

export default Header;
