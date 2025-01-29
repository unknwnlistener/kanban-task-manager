import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Kanban Task Manager",
  description: "A custom kanban task layout for managing local tasks",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        {children}
      </body>
    </html>
  );
}
