import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen overflow-auto">
      <Header appName={process.env.APPLICATION_NAME || "UPWITHCROWD"} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
}
