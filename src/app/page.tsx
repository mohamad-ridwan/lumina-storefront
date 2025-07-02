import BannerCarousel from "@/components/banner";
import { Banner } from "@/types/banner";

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
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-12">
        {/* Banner Carousel Section */}
        <section className="mb-16">
          <BannerCarousel banners={bannerData} />
        </section>
      </main>
    </div>
  );
};

export default Home;
