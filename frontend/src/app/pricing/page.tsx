import { Suspense } from "react";
import Navbar from "@/components/navbar";
import PricingSection from "@/components/pricing-section";
import Footer from "@/components/footer";

export default function PricingPage() {
  return (
    <Suspense fallback={<PricingSkeleton />}>
      <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-[1920px] pt-20">
        <PricingSection />
      </main>
      <Footer />
    </div>
    </Suspense>
  );
}

function PricingSkeleton() {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-[1920px] pt-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="text-center animate-pulse">
            <div className="mx-auto h-10 w-64 rounded-xl bg-gray-200" />
            <div className="mx-auto mt-4 h-5 w-96 rounded-xl bg-gray-100" />
          </div>
          <div className="mt-12 flex justify-center mb-6">
            <div className="h-10 w-48 rounded-full bg-gray-200" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`rounded-2xl border border-gray-200 bg-white p-6 animate-pulse ${i === 1 ? "ring-1 ring-[#96FF1A]/30" : ""}`}>
                <div className="h-5 w-20 rounded bg-gray-200" />
                <div className="mt-3 h-8 w-28 rounded bg-gray-200" />
                <div className="mt-2 h-4 w-40 rounded bg-gray-100" />
                <div className="mt-4 h-10 w-full rounded-full bg-gray-200" />
                <div className="mt-6 space-y-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-3 w-full rounded bg-gray-100" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}