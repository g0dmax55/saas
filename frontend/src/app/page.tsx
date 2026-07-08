import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import VideoCarousel from "@/components/video-carousel";
import LogoMarquee from "@/components/logo-marquee";
import BrandUseCases from "@/components/brand-use-cases";
import EditorPromo from "@/components/editor-promo";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import G2Badges from "@/components/g2-badges";
import DiscoverMore from "@/components/discover-more";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-[1920px]">
        <div className="mb-20 flex w-full flex-col overflow-hidden md:mb-[120px]">
          <div className="mx-auto max-w-screen-2xl md:px-6 xl:max-w-[1408px] xl:px-0">
            <HeroSection />
          </div>
          <VideoCarousel />
        </div>

        <LogoMarquee />
        <BrandUseCases />
        <EditorPromo />
        <TestimonialsCarousel />
        <G2Badges />
        <DiscoverMore />
      </main>
      <Footer />
    </div>
  );
}
