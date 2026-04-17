import type { Metadata } from "next";
import { 
  Geist, 
  Geist_Mono,
  Poppins,
  Roboto,
  Lato,
  Montserrat,
  Open_Sans,
  Raleway,
  Source_Sans_3,
  Caveat
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({ variable: "--font-poppins", weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });
const roboto = Roboto({ variable: "--font-roboto", weight: ["300", "400", "500", "700"], subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato", weight: ["300", "400", "700"], subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"] });
const raleway = Raleway({ variable: "--font-raleway", subsets: ["latin"] });
const sourceSans = Source_Sans_3({ variable: "--font-source-sans", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Builder - Create Your Professional Resume",
  description: "Build a professional resume with our free online Resume Builder. Multiple templates, real-time preview, PDF export, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${roboto.variable} ${lato.variable} ${montserrat.variable} ${openSans.variable} ${raleway.variable} ${sourceSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}
