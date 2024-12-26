export const metadata = {
  title: "CrowdFund - Profiles",
  description: "Empowering ideas through crowdfunding",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">User Profile</h1>
        <div className="flex flex-col gap-8 md:flex-row"></div>
        {children}
      </div>
    </div>
  );
}
