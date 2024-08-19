import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./layout/header";
import { AppProvider } from './Context/CartContext'
import { getServerSession } from "next-auth";
import SessionProvider from '@/utils/SessionProvider';
import { Footer } from "./layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Website",
  description: "Created by Adnan",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <AppProvider>
            <div>
              <Header />
              {children}
              <Footer />
            </div>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
