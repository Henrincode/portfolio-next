import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Henrique Marques",
  description: "Dev Fullstack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-800 flex flex-row h-dvh justify-center items-center">
        {children}
      </body>
    </html>
  );
}
