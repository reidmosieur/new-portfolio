type HeroProps = {
  heroText: string | string[];
}

const Hero = ({
  heroText
}: HeroProps) => {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">{heroText}</h1>
    </div>
  );
};

export default Hero;