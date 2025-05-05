"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { config } from "@/app/config";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <>
        <title>{config.metadata.title}</title>
        <meta name="description" content={config.metadata.description} />
        <link rel="icon" href={config.metadata.icon} sizes="any" />
      </>
      <body>
          <Header />
          {children}
          <Footer />
      </body>
    </html>
  );
}
