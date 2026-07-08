"use client";

import { useState } from "react";
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
      { label: "AI Avatars", href: "#" },
      { label: "AI Video Generator", href: "#" },
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
    label: "AI",
    children: [
      { label: "AI Avatars", href: "#" },
      { label: "Text to Video", href: "#" },
      { label: "AI Voiceover", href: "#" },
      { label: "AI Translate", href: "#" },
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
    <svg
      viewBox="0 0 115 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 flex-none md:h-6 text-veed-dark"
    >
      <path
        d="m32.626.367-8.802 21.589a3.284 3.284 0 0 1-3.041 2.043h-8.895a3.283 3.283 0 0 1-3.04-2.04L.02.367A.266.266 0 0 1 .266 0h8.91c.222 0 .421.138.5.346l6.672 17.795L22.967.348a.533.533 0 0 1 .5-.348h8.912c.189 0 .318.192.247.367Zm.813-.1v23.466c0 .147.12.267.267.267h24.463c.146 0 .266-.12.266-.267v-5.851a.267.267 0 0 0-.266-.267h-15.92a.267.267 0 0 1-.266-.267v-1.927c0-.146.12-.266.267-.266h15.557c.147 0 .267-.12.267-.267V9.082a.267.267 0 0 0-.267-.267H42.25a.267.267 0 0 1-.267-.267V6.652c0-.147.12-.267.267-.267h15.919c.146 0 .266-.12.266-.267V.267A.267.267 0 0 0 58.17 0H33.706a.267.267 0 0 0-.267.267Zm26.12 0v23.466c0 .147.12.267.268.267H84.29c.146 0 .266-.12.266-.267v-5.851a.268.268 0 0 0-.266-.267H68.37a.267.267 0 0 1-.266-.267v-1.927c0-.146.12-.266.267-.266h15.557c.147 0 .267-.12.267-.267V9.082a.267.267 0 0 0-.267-.267H68.37a.267.267 0 0 1-.267-.267V6.652c0-.147.12-.267.267-.267H84.29c.146 0 .266-.12.266-.267V.267A.268.268 0 0 0 84.29 0H59.826a.267.267 0 0 0-.266.267Zm26.123 23.466c0 .147.12.267.266.267h16.76c3.668 0 6.627-.951 8.891-2.868 2.264-1.902 3.396-4.95 3.396-9.147s-1.132-7.245-3.396-9.148C109.335.95 106.377 0 102.708 0h-16.76a.267.267 0 0 0-.266.267v23.466Zm8.81-6.163a.267.267 0 0 1-.267-.267V6.697c0-.147.12-.267.266-.267h6.255c1.932 0 3.366.423 4.302 1.268.936.845 1.403 2.279 1.403 4.287s-.467 3.472-1.403 4.317c-.936.846-2.37 1.268-4.302 1.268h-6.255Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <span className="sr-only">VEED.IO</span>
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
                        className="absolute top-full left-0 mt-1 min-w-[200px] rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg"
                      >
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
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
    </header>
  );
}
