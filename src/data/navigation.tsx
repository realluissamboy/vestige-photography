import React from "react";

export type PageKey = "home" | "portfolio" | "about";

export interface PageLink {
  label: string;
  page: PageKey;
}

export interface SocialLink {
  label: string;
  href: string;
  svg: React.ReactNode;
}

export const PAGE_LINKS: PageLink[] = [
  { label: "Portfolio", page: "portfolio" },
  { label: "About", page: "about" },
];

export const SOCIALS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/susanavestige/",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/vestigephotography/",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.38 0-4.01 1.45-4.01 4.12V9.9H7.6V13h2.68v8h3.22z" />
      </svg>
    ),
  },
];
