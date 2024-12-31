import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
}
