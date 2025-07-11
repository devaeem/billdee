import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Provider from "./session-provider";
import SWRProvider from "@/components/swr";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "billdee - ระบบบิลออนไลน์ | จัดการบิลและค่าใช้จ่าย",
  description: "BillDee - ระบบบิลออนไลน์ | จัดการบิลและค่าใช้จ่าย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${kanit.variable} antialiased min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SWRProvider>
            <Provider>
              {children} <Toaster />
            </Provider>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
