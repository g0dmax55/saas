"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DropdownItem = {
  label: string;
  children: { label: string; href: string }[];
};

type LinkItem = {
  label: string;
  href: string;
};

type NavItem = DropdownItem | LinkItem;

function hasChildren(item: NavItem): item is DropdownItem {
  return "children" in item;
}

const NAV_LINKS: NavItem[] = [
  {
    label: "Product",
    children: [
      { label: "Video Editor", href: "#" },
      { label: "Screen Recorder", href: "#" },
      { label: "Avatars", href: "#" },
      { label: "Video Generator", href: "#" },
    ],
  },
  {
    label: "Use Cases",
    children: [
      { label: "Subtitles", href: "#" },
      { label: "Podcast Clips", href: "#" },
      { label: "Training Videos", href: "#" },
      { label: "Marketing", href: "#" },
    ],
  },
  {
    label: "Tools",
    children: [
      { label: "Avatars", href: "#" },
      { label: "Text to Video", href: "#" },
      { label: "Voiceover", href: "#" },
      { label: "Translate", href: "#" },
    ],
  },
  {
    label: "APIs",
    children: [
      { label: "API Docs", href: "#" },
      { label: "SDK", href: "#" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Help Center", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Templates", href: "#" },
    ],
  },
  { label: "Enterprise", href: "#" },
  { label: "Pricing", href: "#" },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
    </svg>
  );
}

function Logo() {
  return (
    <span className="text-lg font-bold tracking-tight text-[#121212] md:text-xl">
      SubCaps
    </span>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeAll]);

  return (
    <header
      data-testid="v3-lite-header"
      className="absolute top-0 left-0 z-40 w-full font-normal text-base"
    >
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

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  hasChildren(item) && setOpenMenu(item.label)
                }
                onMouseLeave={() => setOpenMenu(null)}
              >
                {hasChildren(item) ? (
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-base text-gray-700 no-underline transition-colors duration-150 hover:text-gray-900"
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu(openMenu === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <ChevronDown className="size-2.5 text-gray-400" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-base text-gray-700 no-underline transition-colors duration-150 hover:text-gray-900"
                  >
                    {item.label}
                  </a>
                )}

                {hasChildren(item) && (
                  <AnimatePresence>
                    {openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        role="menu"
                        className="absolute top-full left-0 mt-1 min-w-[200px] rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg"
                      >
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            role="menuitem"
                            className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                          >
                            {child.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
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

      {/* ── Mobile menu panel ── */}
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
              {NAV_LINKS.map((item) =>
                hasChildren(item) ? (
                  <div key={item.label}>
                    <button
                      type="button"
                      aria-expanded={openMenu === item.label}
                      aria-haspopup="true"
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-gray-800 transition-colors hover:bg-gray-50"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === item.label ? null : item.label,
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-2.5 text-gray-400 transition-transform duration-200 ${
                          openMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openMenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.15, ease: "easeInOut" }}
                          role="menu"
                          className="overflow-hidden pl-3"
                        >
                          {item.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              role="menuitem"
                              className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                            >
                              {child.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-800 transition-colors hover:bg-gray-50"
                  >
                    {item.label}
                  </a>
                ),
              )}

              {/* Mobile Login & Sign Up */}
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
