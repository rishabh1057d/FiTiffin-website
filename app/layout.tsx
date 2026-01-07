import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteTitle = "FiTiffin | Healthy Office Lunches for Teams"
const siteDescription =
  "Fresh, nutritionist-designed office lunches delivered daily. Boost team wellness, productivity, and culture with FiTiffin's high-protein corporate meal plans."

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fitiffin.com"),
  title: siteTitle,
  description: siteDescription,
  generator: "FiTiffin",
  keywords: [
    "office lunch delivery",
    "corporate lunch",
    "team lunches",
    "healthy office meals",
    "corporate catering",
    "daily office tiffin",
    "high protein meals",
    "employee wellness food",
    "office lunch subscription",
    "meal plans for offices",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://www.fitiffin.com",
    siteName: "FiTiffin",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/WhatsApp_Image_2025-12-27_at_6.13.22_PM__1_-removebg-preview.png",
        width: 512,
        height: 256,
        alt: "FiTiffin logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/WhatsApp_Image_2025-12-27_at_6.13.22_PM__1_-removebg-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/fitiffin-logo.svg",
        type: "image/svg+xml",
      },
      {
        url: "/WhatsApp_Image_2025-12-27_at_6.13.22_PM__1_-removebg-preview.png",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
      { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
    ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationLdJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FiTiffin",
    url: "https://www.fitiffin.com",
    logo: "https://www.fitiffin.com/WhatsApp_Image_2025-12-27_at_6.13.22_PM__1_-removebg-preview.png",
    description: siteDescription,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "business@fitiffin.com",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: ["https://www.fitiffin.com"],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLdJson) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
