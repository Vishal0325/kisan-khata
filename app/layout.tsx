import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { PWAMetaTags } from "@/components/PWAMetaTags";
import { Home, Users, Store } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#059669",
};

export const metadata: Metadata = {
  title: "किसान सेवा केंद्र - डिजिटल खाता",
  description: "किसानों और वेंडरों के हिसाब-किताब का डिजिटल प्रबंधन",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "KisanKhata",
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: "website",
    url: "https://kisan-khata.example.com",
    title: "किसान सेवा केंद्र - डिजिटल खाता",
    description: "किसानों और वेंडरों के हिसाब-किताब का डिजिटल प्रबंधन",
    siteName: "KisanKhata",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen pb-20`}>
        <ServiceWorkerRegistration />
        <PWAMetaTags />
        <LanguageProvider>
          {/* Top Header */}
          <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2 font-black text-emerald-700 text-xl tracking-tight">
                <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
                  <Home className="h-5 w-5" />
                </div>
                <span>किसान <span className="text-gray-900 font-medium font-hindi">खाता</span></span>
              </Link>

              {/* भाषा बदलने का बटन यहाँ है */}
              <LanguageSelector />
            </div>
          </header>

          <main className="container mx-auto p-4 md:p-6 max-w-5xl">
            {children}
          </main>

          {/* Bottom Navigation for Mobile */}
          <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-white px-6 py-3 md:hidden">
            <div className="flex justify-around items-center">
              <Link href="/" className="flex flex-col items-center gap-1 text-emerald-600">
                <Home className="h-6 w-6" />
                <span className="text-[10px] font-bold">Home</span>
              </Link>
              <Link href="/farmers" className="flex flex-col items-center gap-1 text-gray-500 hover:text-emerald-600">
                <Users className="h-6 w-6" />
                <span className="text-[10px] font-bold">Farmers</span>
              </Link>
              <Link href="/vendors" className="flex flex-col items-center gap-1 text-gray-500 hover:text-emerald-600">
                <Store className="h-6 w-6" />
                <span className="text-[10px] font-bold">Vendors</span>
              </Link>
            </div>
          </nav>
        </LanguageProvider>
      </body>
    </html>
  );
}