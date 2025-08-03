import type { Metadata } from "next";
import { Header } from "@/components/Header";



export const metadata: Metadata = {
  title: "PetRegistry - Animal Management System",
  description: "Comprehensive animal registration and management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
