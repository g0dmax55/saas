export default function G2Badges() {
  return (
    <section className="mx-auto mt-24 w-full max-w-[1200px] px-2 md:px-6 lg:max-w-[845px] lg:px-0 xl:max-w-[1200px]">
      <div className="relative flex flex-col items-center gap-[31px] overflow-hidden rounded-2xl bg-[#121212] py-10">
        <img
          src="https://cdn-site-assets.veed.io/g2_section_bg_mobile_321fc34e2d/g2_section_bg_mobile_321fc34e2d.webp"
          alt=""
          className="pointer-events-none absolute bottom-0 left-0 w-full select-none object-cover md:hidden"
        />
        <img
          src="https://cdn-site-assets.veed.io/g2_section_bg_desktop_5646817f34/g2_section_bg_desktop_5646817f34.webp"
          alt=""
          className="pointer-events-none absolute bottom-0 left-0 hidden w-full select-none object-cover md:block"
        />

        <p className="relative text-center font-medium text-sm text-white leading-none tracking-[-0.08px] md:text-base">
          G2 Best AI software company 2026
        </p>

        <div className="relative flex items-center gap-[15px] md:gap-6">
          <img
            src="https://cdn-site-assets.veed.io/g2_badge_uk_bc1cf97bb7/g2_badge_uk_bc1cf97bb7.webp"
            alt="G2 Best Software 2026 - Top 50 UK"
            width={156}
            height={180}
            className="h-auto w-[99px] md:w-auto"
            style={{ maxWidth: 156 }}
          />
          <img
            src="https://cdn-site-assets.veed.io/g2_badge_ai_products_d9fbda876b/g2_badge_ai_products_d9fbda876b.webp"
            alt="G2 Best Software 2026 - Top 50 AI Products"
            width={181}
            height={209}
            className="h-auto w-[114px] md:w-auto"
            style={{ maxWidth: 181 }}
          />
          <img
            src="https://cdn-site-assets.veed.io/g2_badge_design_products_1b87aa120a/g2_badge_design_products_1b87aa120a.webp"
            alt="G2 Best Software 2026 - Top 50 Design Products"
            width={156}
            height={180}
            className="h-auto w-[99px] md:w-auto"
            style={{ maxWidth: 156 }}
          />
        </div>
      </div>
    </section>
  );
}
