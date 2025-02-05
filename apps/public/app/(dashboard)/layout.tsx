import Header from "@/components/Header";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="h-screen overflow-auto">
      <Header />
      {children}
    </section>
  );
}
