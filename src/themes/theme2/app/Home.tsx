import LatestOffers from "@/components/home/latest-offers";
import PopularCategories from "@/components/home/popular-categories";
import BannerCarousel from "@/shared/components/banner";
import ContainerPage from "@/shared/components/ContainerPage";
import { HomeProps } from "@/shared/types/home";

const HomePage = ({ banners }: HomeProps) => {
  return (
    <ContainerPage>
      {/* Banner Carousel Section */}
      <section>
        <BannerCarousel banners={banners} />
      </section>
      <PopularCategories />
      <LatestOffers />
    </ContainerPage>
  );
};

export default HomePage;
