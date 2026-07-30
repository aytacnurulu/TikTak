import Header from "@/shared/components/Header";
import Container from "@/shared/components/Container";
import type { ReactNode } from "react";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
