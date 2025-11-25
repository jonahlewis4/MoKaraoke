import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoKaraoki",
  description: "A site to help you create and share your karaoke music videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={""}
      >
        {children}
      </body>
    </html>
  );
}
