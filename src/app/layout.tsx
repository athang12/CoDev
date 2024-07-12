import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { FaGithub, FaChrome, FaLinkedin} from "react-icons/fa";
// import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoDev",
  description:
    "An application to help pair programming with random devs online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <NextTopLoader />
          <Header />
          <div className="container mx-auto">{children}</div>
          
        </Providers>
        <footer className="bg-gray-100 py-2 dark:bg-gray-900 z-10 text-center mt-48">
        <p className="flex items-center justify-center">
    Made with ❤️ by Athang <a href="https://github.com/athang12"><FaGithub className="ml-4" /></a> <a href="https://athang-portfolio.netlify.app/"><FaChrome className="ml-4" /></a> <a href="https://www.linkedin.com/in/athang-yende-461a00224/"><FaLinkedin className="ml-4" /></a>
  </p>
            <p>&copy; 2024 My Website. All rights reserved.</p>
          </footer>
      </body>
    </html>
  );
}
