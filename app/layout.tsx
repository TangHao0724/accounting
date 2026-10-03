import type { Metadata } from "next";
import {Chiron_Hei_HK} from "next/font/google";
import "./globals.css";
import ThemeToggle from "./component/Themetoggle";


const chinese = Chiron_Hei_HK({
  variable: "--font-chiron-hei-hk",
  weight:"400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "記帳本",
  description: "記錄生活",
};

export default function RootLayout({ children }: LayoutProps<"/">) {

  return (
    <html
      lang="en"
      className={` ${chinese.variable} h-full antialiased`}
    > 
      <body className="min-h-full flex flex-col">
        <div className="z-100 absolute bottom-2 right-2">
          <ThemeToggle/>
        </div>
        {children}
      </body>
    </html>
  );
}
