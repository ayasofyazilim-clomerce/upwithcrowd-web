import Image from 'next/image'

const team = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "/placeholder.svg",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "/placeholder.svg",
  },
  {
    name: "Alex Johnson",
    role: "Head of Community",
    image: "/placeholder.svg",
  },
  {
    name: "Maria Garcia",
    role: "Lead Designer",
    image: "/placeholder.svg",
  },
]

export default function ExpertTeam() {
  return (
    <section className="py-12 md:py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Expert Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

