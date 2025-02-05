interface LandingHeroProps {
  title: string;
  description: string;
}

export default function LandingHero({title, description}: LandingHeroProps) {
  return (
    <>
      <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">{title}</h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg md:text-xl">{description}</p>
    </>
  );
}
