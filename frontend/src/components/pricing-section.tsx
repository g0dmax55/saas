"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LogoMarquee from "./logo-marquee";

const PLANS = [
  {
    name: "Free",
    monthlyPrice: "0",
    yearlyPrice: "0",
    period: "/month",
    cta: "Get Started",
    ctaVariant: "outline" as const,
    description: "For trying out SubCaps.",
    features: [
      "5 subtitle videos / month",
      "Auto language detection",
      "3 basic subtitle styles",
      "Export up to 720p",
      "SubCaps watermark",
    ],
    missing: [
      "Word-by-word animation",
      "Gradient & custom styles",
      "1080p export",
      "API access",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: "14",
    yearlyPrice: "11",
    period: "/month",
    cta: "Start Free Trial",
    ctaVariant: "filled" as const,
    description: "For content creators who post regularly.",
    highlight: true,
    features: [
      "Unlimited subtitle videos",
      "Auto language detection",
      "All 20+ subtitle styles",
      "Word-by-word animation",
      "Professional styled subtitles",
      "Export up to 1080p",
      "No watermark",
    ],
    missing: [
      "Team workspace",
      "API access",
    ],
  },
  {
    name: "Business",
    monthlyPrice: "39",
    yearlyPrice: "31",
    period: "/month",
    cta: "Start Free Trial",
    ctaVariant: "filled" as const,
    description: "For teams and agencies.",
    features: [
      "Everything in Pro",
      "4K export quality",
      "5 team members",
      "Branded style kits",
      "Priority support",
      "API access",
      "Custom subtitle fonts",
    ],
    missing: [],
  },
];

const FAQ = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of the billing period.",
  },
  {
    q: "What happens to my videos if I downgrade?",
    a: "All your exported videos stay with you. You simply lose access to premium features until you upgrade again.",
  },
  {
    q: "Do you offer annual plans?",
    a: "Yes — switch to yearly billing and save ~20%. All features are the same, just billed annually.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. Upgrade or downgrade anytime. If you upgrade, you'll be charged the prorated difference. If you downgrade, changes take effect at the next billing cycle.",
  },
  {
    q: "What subtitle languages are supported?",
    a: "SubCaps supports auto-detection and transcription for 40+ languages including English, Spanish, French, German, Hindi, Japanese, Korean, Portuguese, and more.",
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  const price = (plan: (typeof PLANS)[number]) =>
    annual ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <>
      <section className="pt-16 md:pt-[100px] pb-0">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-[#121212] sm:text-3xl md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#79716B] md:text-base">
            Start free. Upgrade when you need premium styles, higher quality, and team features.
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-8 flex items-center justify-center gap-3 md:mt-10">
          <span
            className={`text-sm font-medium ${
              !annual ? "text-[#121212]" : "text-[#79716B]"
            }`}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-7 w-12 cursor-pointer items-center rounded-full transition-colors ${
              annual ? "bg-[#96FF1A]" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                annual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              annual ? "text-[#121212]" : "text-[#79716B]"
            }`}
          >
            Yearly
          </span>
          <span className="ml-1 rounded-full bg-[#E6FFC8] px-2.5 py-0.5 text-xs font-semibold text-[#121212]">
            Save 20%
          </span>
        </div>

         {/* Plan cards */}
        <motion.div
          className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className={`relative flex flex-col rounded-2xl border p-6 md:p-8 transition-shadow hover:shadow-lg ${
                plan.highlight
                  ? "border-[#96FF1A] shadow-lg shadow-[#96FF1A]/10"
                  : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#96FF1A] px-4 py-1 text-xs font-semibold text-[#121212]">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-[#121212]">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-[#79716B]">{plan.description}</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#121212]">
                  ${price(plan)}
                </span>
                <span className="text-sm text-[#79716B]">{plan.period}</span>
              </div>
              {annual && plan.yearlyPrice !== plan.monthlyPrice && (
                <p className="mt-1 text-xs text-[#79716B]">
                  ${Number(plan.monthlyPrice) * 12} billed annually
                </p>
              )}

              <a
                href="/signup"
                className={`mt-6 block rounded-full px-6 py-2.5 text-center text-sm font-semibold transition-all ${
                  plan.ctaVariant === "filled"
                    ? "bg-[#96FF1A] text-[#121212] hover:brightness-95"
                    : "border border-gray-300 text-[#121212] hover:bg-gray-50"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#96FF1A]"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8l3.5 3.5L13 5" />
                    </svg>
                    <span className="text-[#121212]">{f}</span>
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-gray-300"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 8h8" />
                    </svg>
                    <span className="text-[#79716B]">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    <LogoMarquee />

    <section className="pb-16 md:pb-[100px] pt-0">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Feature comparison table */}
        <div className="mt-10 md:mt-16">
          <h3 className="text-center text-xl font-semibold text-[#121212] md:text-2xl">
            Compare plans
          </h3>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 pr-4 font-medium text-[#121212]">Feature</th>
                  <th className="pb-3 px-4 text-center font-medium text-[#121212]">Free</th>
                  <th className="pb-3 px-4 text-center font-medium text-[#121212]">Pro</th>
                  <th className="pb-3 pl-4 text-center font-medium text-[#121212]">Business</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Videos / month", free: "5", pro: "Unlimited", business: "Unlimited" },
                  { label: "Subtitle styles", free: "3", pro: "20+", business: "20+" },
                  { label: "Word-by-word animation", free: "—", pro: "✓", business: "✓" },
                  { label: "Auto language detection", free: "✓", pro: "✓", business: "✓" },
                  { label: "Export quality", free: "720p", pro: "1080p", business: "4K" },
                  { label: "Watermark", free: "Yes", pro: "No", business: "No" },
                  { label: "Custom fonts", free: "—", pro: "—", business: "✓" },
                  { label: "Brand kit", free: "—", pro: "—", business: "✓" },
                  { label: "Team members", free: "1", pro: "1", business: "5" },
                  { label: "API access", free: "—", pro: "—", business: "✓" },
                  { label: "Support", free: "Email", pro: "Priority", business: "Priority" },
                ].map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-gray-50/50" : ""}>
                    <td className="py-3 pr-4 font-medium text-[#121212]">
                      {row.label}
                    </td>
                    <td className="py-3 px-4 text-center text-[#79716B]">{row.free}</td>
                    <td className="py-3 px-4 text-center text-[#79716B] bg-[#E6FFC8]/30">
                      {row.pro}
                    </td>
                    <td className="py-3 pl-4 text-center text-[#79716B]">{row.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 md:mt-32">
          <h3 className="text-center text-2xl font-bold tracking-tight text-[#121212] md:text-3xl">
            Frequently asked questions
          </h3>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-gray-200">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5 md:py-6">
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-[#121212] md:text-lg">
                  {item.q}
                  <svg
                    className="h-5 w-5 shrink-0 text-[#79716B] transition-transform group-open:rotate-180"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#79716B] md:text-[15px]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

