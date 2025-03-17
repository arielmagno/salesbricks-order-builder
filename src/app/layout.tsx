import StoreProvider from "@/components/StoreProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salesbricks Order Builder",
  description: "A multi-step order-building workflow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>{" "}
        {/* ✅ Wrap with Redux Provider */}
      </body>
    </html>
  );
}
