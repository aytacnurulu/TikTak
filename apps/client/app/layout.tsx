import Header from "@/shared/components/Header";
import "./globals.css";
import { Roboto } from "next/font/google";
import Container from "@/shared/components/Container";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <main>
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
