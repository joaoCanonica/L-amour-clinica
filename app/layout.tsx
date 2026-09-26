import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { introBootScript } from "@/lib/intro";
import { PageTransitionProvider } from "@/components/transition/PageTransition";
import { ogImage } from "@/lib/media";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — ${site.taglines.primary}`,
    template: `%s — ${site.shortName}`,
  },
  description:
    "Clínica de estética avançada facial e corporal, ozonioterapia, harmonização orofacial, massoterapia e podologia em Lages/SC. Atendimento somente com agendamento.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    url: "/",
    images: [{ ...ogImage("default"), alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage("default").url],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f0e8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: site.name,
  url: site.url,
  telephone: [`+${site.phones.whatsapp.e164}`, `+${site.phones.landline.e164}`],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: "BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca o documento como "com JS" antes da pintura: os elementos com
            revelação começam ocultos só quando a animação vai de fato rodar. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" + introBootScript }} />
      </head>
      <body>
        <SmoothScroll>
          <PageTransitionProvider>
            <a
              href="#conteudo"
              className="sr-only z-[200] rounded-full bg-navy-950 px-5 py-3 text-linho type-label focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
              Pular para o conteúdo
            </a>
            <Header />
            <main id="conteudo">{children}</main>
            <Footer />
            <FloatingCTA />
            <ConsentBanner />
          </PageTransitionProvider>
        </SmoothScroll>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
