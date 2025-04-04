import "@/app/globals.css";
import { Inter, Chakra_Petch } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-logo",
});

export const metadata: Metadata = {
  title: "sgmn.dev",
  description: "Personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${chakraPetch.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
