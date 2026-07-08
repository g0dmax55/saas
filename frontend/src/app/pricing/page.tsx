import Navbar from "@/components/navbar";
import PricingSection from "@/components/pricing-section";
import Footer from "@/components/footer";

export default function PricingPage() {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-[1920px] pt-20">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}


