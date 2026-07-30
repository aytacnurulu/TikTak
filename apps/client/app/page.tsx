import Header from "@/shared/components/Header";
import Container from "@/shared/components/Container";
import LandingPage from "@/features/landing/pages/LandingPage";
import Footer from "@/shared/components/Footer";

export default function RootPage() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <LandingPage />
        </Container>
      </main>
      <Footer />
    </>
  );
}
