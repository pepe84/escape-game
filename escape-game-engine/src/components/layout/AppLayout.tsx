import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({
  children,
}: AppLayoutProps) {
  return (

    <div className="min-h-screen flex flex-col bg-slate-50">

      <Header />

      <main className="flex-1 pt-16">
        <div className="max-w-2xl mx-auto p-8 space-y-4">
          {children}
        </div>
      </main>

      <Footer />

    </div>
  );
}