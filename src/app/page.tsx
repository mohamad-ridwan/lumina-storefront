import BannerCarousel from "@/shared/components/banner";
import ContainerPage from "@/shared/components/ContainerPage";
import LatestOffers from "@/shared/components/home/latest-offers";
import PopularCategories from "@/shared/components/home/popular-categories";
import { Banner } from "@/shared/types/banner";

// Main App component for the storefront application
const Home = () => {
  // Mock banner data
  const bannerData: Banner[] = [
    {
      image:
        "https://images.unsplash.com/photo-1661152655333-7b5275ad6baa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1571736772567-3aa763ff559a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1680254418548-02c8ac7ffb6c?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <ContainerPage>
      {/* Banner Carousel Section */}
      <section>
        <BannerCarousel banners={bannerData} />
      </section>
      <PopularCategories />
      <LatestOffers />
    </ContainerPage>
  );
};

export default Home;
