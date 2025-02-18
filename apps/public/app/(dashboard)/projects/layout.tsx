export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="bg-muted">
      <div>{children}</div>
    </section>
  );
}
