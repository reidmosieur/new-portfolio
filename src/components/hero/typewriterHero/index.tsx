import Typewriter from '../../typewriter';
import { TypewriterProps } from '@/components/typewriter/types';

type TypewriterHeroProps = {
    typewriterProps: TypewriterProps;
}

const TypewriterHero = ({
    typewriterProps,
}: TypewriterHeroProps) => {
  return (
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
      <Typewriter
        {...typewriterProps}
      />
    </h1>
  );
};

export default TypewriterHero;