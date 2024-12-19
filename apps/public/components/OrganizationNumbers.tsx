const stats = [
  { label: "Projects Funded", value: "10,000+" },
  { label: "Total Raised", value: "$100M+" },
  { label: "Global Backers", value: "1M+" },
  { label: "Success Rate", value: "78%" },
]

export default function OrganizationNumbers() {
  return (
    <section className="py-12 md:py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">CrowdFund in Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm md:text-lg text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

