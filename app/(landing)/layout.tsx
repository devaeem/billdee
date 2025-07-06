import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BillDee - Smart Billing Solution",
  description:
    "Streamline your billing process with BillDee's smart billing solution",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className={`${inter.className} antialiased`}>{children}</main>
    </div>
  );
}
