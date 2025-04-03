import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: PropsWithChildren) {
  const title = "Dream";

  return (
    <html suppressHydrationWarning>
      <title>{title}</title>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
