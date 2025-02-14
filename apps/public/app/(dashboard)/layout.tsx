import Header from "@/components/header";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="min-h-screen">
      <Header />
      <div className="bg-muted mb-10 size-full overflow-auto pb-10">{children}</div>
    </section>
  );
}
