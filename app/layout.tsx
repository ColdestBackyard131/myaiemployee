import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My AI Employee",
  description: "Your personal AI-powered productivity platform",
  icons: {
    icon: "/images/logo.jpeg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
