import Backdrop from "@public/back-drop.png";

const stats = [
  {label: "Finanse Edilen Projeler", value: "10.000+"},
  {label: "Toplam Toplanan", value: "$100M+"},
  {label: "Küresel Destekçiler", value: "1M+"},
  {label: "Başarı Oranı", value: "78%"},
];

export default function OrganizationNumbers() {
  return (
    <section className="bg-primary px-6 py-12 text-white md:py-20" style={{backgroundImage: `url('${Backdrop.src}')`}}>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div className="text-center" key={index}>
              <p className="mb-2 text-3xl font-bold md:text-6xl">{stat.value}</p>
              <p className="text-muted text-sm md:text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
