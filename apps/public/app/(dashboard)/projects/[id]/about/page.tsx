import ClientAbout from "./client";

const mockAboutDetail = {
  nationality: "Türkiye",
  education: "Lisans - Bilgisayar Mühendisliği",
  workExperience: "5 yıl yazılım geliştirme deneyimi",
  expertise: "Web Geliştirme, Mobile App, Cloud Computing",
  cv: "",
  linkedin: "https://linkedin.com/in/example",
  twitter: "https://twitter.com/example",
  website: "https://example.com",
};

export default function About() {
  return (
    <div>
      <ClientAbout aboutDetail={mockAboutDetail} />
    </div>
  );
}
