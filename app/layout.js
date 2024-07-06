
import SideBar from "./components/sidebar";
import { Roboto } from "next/font/google";
import {Suspense} from 'react';
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight:['400', '500', '700']});

export const metadata = {
  title: "Your Grandma's Cookbook",
  description: "Explore a diverse range of meals with detailed ingredients, step-by-step instructions, and cultural backgrounds. Perfect for food enthusiasts and home cooks looking to recreate traditional dishes with a modern twist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
      <body className={roboto.className}>
        <div className="md:flex">
        
        <SideBar />
        <Suspense fallback={<div>Loading...</div>}>
        <div  className="flex-1 ">{children}</div>
        </Suspense>
        </div>
        
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
        </body>
    </html>
  );
}
