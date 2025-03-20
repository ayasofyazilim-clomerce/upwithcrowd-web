function PageHeader({title, description, children}: {title: string; description: string; children?: React.ReactNode}) {
  return (
    <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className={children ? "mb-4 sm:mb-6" : ""}>
        <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">{title}</h1>
        <p className="mt-1 text-sm text-gray-600 sm:mt-2">{description}</p>
      </div>
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">{children}</div>
    </div>
  );
}

export default PageHeader;
