import Header from "@/components/header";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="h-full">
      <Header />
      {children}
    </section>
  );
}
