import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";
import { CarrinhoProvider } from "../components/CarrinhoContext";
import { FavoritosProvider } from "../components/FavoritosContext";
import BackToTop from "../components/BackToTop";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Webtech Store",
  description: "A lojinha da webtech desenvolvida em 2025",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value as "light" | "dark" | undefined;

  return (
    <html lang="pt-BR" className={theme === "dark" ? "dark" : ""}>
      <head></head>
      <body className={`${montserrat.variable} font-montserrat antialiased`}>
        <ThemeProvider defaultTheme={theme}>
          <FavoritosProvider>
            <CarrinhoProvider>
              <div className="min-h-screen">{children}</div>
              <BackToTop />
            </CarrinhoProvider>
          </FavoritosProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
