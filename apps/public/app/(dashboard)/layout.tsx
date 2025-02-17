import Header from "@/components/header";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="min-h-screen">
      <Header />
      <div className="bg-muted size-full h-[calc(100vh-6rem)] overflow-auto">{children}</div>
    </section>
  );
}
