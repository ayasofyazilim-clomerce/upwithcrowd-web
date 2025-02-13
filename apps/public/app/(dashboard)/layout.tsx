import Header from "@/components/Header";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="min-h-screen">
      <Header />
      <div className="h-full overflow-auto">{children}</div>
    </section>
  );
}
