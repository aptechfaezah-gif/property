import PageWrapper from "@/components/layout/PageWrapper";
import HeroSection from "@/sections/home/HeroSection";
import FeaturedProperties from "@/sections/home/FeaturedProperties";
import WhyChooseUs from "@/sections/home/WhyChooseUs";
import Testimonials from "@/sections/home/Testimonials";

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
    </PageWrapper>
  );
}
