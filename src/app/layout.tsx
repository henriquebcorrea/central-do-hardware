import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Central do Hardware | Peças de PC com os Melhores Preços",
  description:
    "Loja online de peças de PC: placas de vídeo, memória RAM, SSDs, periféricos gamer e mais. Monte o setup dos seus sonhos com componentes de qualidade e entrega rápida.",
  keywords: "peças de PC, hardware, placa de vídeo, memória RAM, SSD, gamer, periféricos, computador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <ChatWidget />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
