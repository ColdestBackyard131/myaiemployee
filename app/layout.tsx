import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My AI Employee",
  description: "Your personal AI-powered productivity platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
