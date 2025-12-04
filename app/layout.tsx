import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Henrique Marques",
  description: "Dev Fullstack",

  keywords: [
    "Henrique Marques",
    "Desenvolvedor Fullstack",
    "Programador",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Supabase",
  ],

  authors: [{ name: "Henrique Marques" }],

  creator: "Henrique Marques",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-800 text-gray-50">{children}</body>
    </html>
  );
}
