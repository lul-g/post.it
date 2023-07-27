import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Roboto } from "@next/font/google";
import QueryWrapper from "./QueryWrapper";
import Head from "next/head";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-rboboto",
});

export const metadata = {
  title: "Post.it",
  description: "Watered down social media app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-roboto bg-black`}>
        <div className="mx-auto" style={{ maxWidth: "500px" }}>
          <QueryWrapper>
            <Nav />
            {children}
            <Footer />
          </QueryWrapper>
        </div>
      </body>
    </html>
  );
}
