import Header from "@/components/header";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="min-h-screen">
      <Header />
      <div className="h-screen">{children}</div>
    </section>
  );
}
