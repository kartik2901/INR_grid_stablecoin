// import "../../public/fonts/gilroy.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "@/components/loader/loader";
import { aileron, poppins } from "@/fonts/fonts";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./index.scss";
export const metadata: Metadata = {
  title: "INRC",
  description: "First CBDC Backed Stablecoin Fully Compliant and Built in India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${aileron.variable} ${poppins.variable}`}>
      <body>
        <Toaster />
        <Loader />
        {children}
      </body>
    </html >
  );
}
