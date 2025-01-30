import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/state/provider";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Kanban Task Manager",
  description: "A custom kanban task layout for managing local tasks",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={"pb-24 h-screen overflow-hidden"}>
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
