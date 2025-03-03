import Image from "next/image";

const team = [
  {
    name: "Ahmet Yılmaz",
    role: "CEO & Kurucu",
    image: "/placeholder.svg",
  },
  {
    name: "Ayşe Demir",
    role: "CTO",
    image: "/placeholder.svg",
  },
  {
    name: "Mehmet Kaya",
    role: "Topluluk Yöneticisi",
    image: "/placeholder.svg",
  },
  {
    name: "Zeynep Çelik",
    role: "Baş Tasarımcı",
    image: "/placeholder.svg",
  },
];

export default function ExpertTeam() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="container mx-auto">
        <h1 className="text-center text-2xl uppercase">Ekibimiz</h1>
        <h2 className="text-center text-4xl font-bold">Uzman Ekibimizle Tanışın</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <div className="text-center" key={index}>
              <Image
                alt={member.name}
                className="mx-auto mb-4 h-32 w-32 rounded-3xl object-cover md:h-48 md:w-48"
                height={300}
                src={member.image}
                width={300}
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
