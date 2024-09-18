import type { PropsWithChildren } from "react";
import "./globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="h-screen bg-indigo-100">{children}</body>
    </html>
  );
}
