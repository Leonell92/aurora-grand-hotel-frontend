import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { AmenitiesSection } from "@/components/home/AmenitiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";


const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedRooms />
      <AmenitiesSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
