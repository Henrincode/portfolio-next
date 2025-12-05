import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Poppins, Bebas_Neue, Indie_Flower } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  // Poppins como global (className)
})

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: ["400"],
})

const indie = Indie_Flower({
  subsets: ["latin"],
  variable: "--font-indie",
  weight: ["400"],
})

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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.className} ${bebas.variable} ${indie.variable}`}>
      <body className="bg-gray-800 text-gray-50">
        {children}
      </body>
    </html>
  )
}
