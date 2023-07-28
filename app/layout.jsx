import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Roboto } from "@next/font/google";
import QueryWrapper from "./QueryWrapper";
import Head from "next/head";
import Providers from "./components/Providers";

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
      <Head>
        <meta
          name="google-site-verification"
          content="RuuXp2wp67anc2vahqF_-sZl2Md89Hq7GxYL8dsBUKE"
        />
      </Head>
      <body className={`${roboto.variable} font-roboto bg-black`}>
        <Providers>
          <div className="mx-auto" style={{ maxWidth: "500px" }}>
            <QueryWrapper>
              <Nav />
              {children}
              <Footer />
            </QueryWrapper>
          </div>
        </Providers>
      </body>
    </html>
  );
}
