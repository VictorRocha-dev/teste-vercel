import type { Metadata } from "next";
import "@/styles/globals.css";
import { Nunito } from "next/font/google";

export const metadata: Metadata = {
  title: "AcheLar - Encontre o imóvel dos seus sonhos",
  description:
    "Navegue por uma ampla variedade de imóveis para comprar ou alugar. Encontre as melhores oportunidades do mercado com facilidade e segurança.",
  keywords: [
    "imóveis",
    "compra de imóveis",
    "aluguel de imóveis",
    "casas à venda",
    "apartamentos para alugar",
    "anunciar imóvel",
    "mercado imobiliário",
  ],
  icons: {
    icon: "/favicon.svg",
  },
};

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.className}>
      <head>
        {/* Se quiser um fallback, pode adicionar manualmente */}
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body>
        {process.env.ENVIRONMENT === "development" && (
          <div className="fixed left-0 top-0 z-50 flex w-[30px] items-center justify-center bg-gray-200 py-[2.5px] text-[12px] uppercase text-black sm:bg-red-200 md:bg-yellow-200 lg:bg-green-200 xl:bg-blue-200 2xl:bg-pink-200">
            <span className="block sm:hidden">all</span>
            <span className="hidden sm:block md:hidden">sm</span>
            <span className="hidden md:block lg:hidden">md</span>
            <span className="hidden lg:block xl:hidden">lg</span>
            <span className="hidden xl:block 2xl:hidden">xl</span>
            <span className="hidden 2xl:block">2xl</span>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
