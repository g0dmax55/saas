"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Styles", href: "#styles" },
  { label: "Pricing", href: "/pricing" },
];

function Logo() {
  return (
    <span className="text-lg font-bold tracking-tight text-[#121212] md:text-xl">
      SubCaps
    </span>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="absolute top-0 left-0 z-40 w-full font-normal text-base">
      <div
        className="w-full"
        style={{
          backdropFilter: "saturate(180%) blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between p-3">
          <a className="group appearance-none -m-2 p-2" href="/">
            <span className="sr-only">SubCaps</span>
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-base text-gray-700 no-underline transition-colors duration-150 hover:text-gray-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <a
              href="/login"
              className="hidden rounded-full px-3 py-2 text-base text-gray-700 no-underline hover:text-gray-500 lg:inline-block"
            >
              Login
            </a>
            <a
              href="/signup"
              className="rounded-full bg-[#323232] px-4 pt-[10px] pb-3 text-sm font-medium tracking-tight text-white no-underline lg:px-3 lg:py-[10px] lg:text-base"
            >
              Sign Up
            </a>
            <button
              type="button"
              className="flex size-10 cursor-pointer items-center justify-center lg:hidden"
              aria-label="Menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div className="flex flex-col items-center justify-center gap-[5px]">
                <div className="h-[1.2px] w-6 bg-[#323232]" />
                <div className="h-[1.2px] w-6 bg-[#323232]" />
                <div className="h-[1.2px] w-6 bg-[#323232]" />
              </div>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-gray-100 bg-white lg:hidden"
          >
            <nav className="mx-auto flex max-w-[1200px] flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-800 transition-colors hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ))}
              <hr className="my-2 border-gray-100" />
              <a
                href="/login"
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Login
              </a>
              <a
                href="/signup"
                className="mt-1 block rounded-full bg-[#323232] px-4 py-3 text-center text-base font-medium text-white no-underline transition-colors hover:bg-[#1a1a1a]"
              >
                Sign Up
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
