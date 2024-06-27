import ArticleCard, { ArticleCardProps } from "../articles/card";
import CodeSample from "../sample/components/CodeSample";
import { SampleCodeContextProvider } from "../sample/context/samplesStateProvider";
import { Folder, CodeSample as CodeSampleType } from "../sample/types/types";

export interface Samples {
  samplesPreviews?: ArticleCardProps[];
  defaultSamplesStructure?: Folder;
  defaultActiveSample?: CodeSampleType;
}

export default function Samples({
  samplesPreviews,
  defaultActiveSample,
  defaultSamplesStructure,
}: Samples) {
  return (
    <div className="relative max-w-xs sm:container mx-auto flex flex-col-reverse xl:flex-row gap-24 justify-center">
      <ul
        className={`max-w-xs md:container h-fit mx-auto ${
          defaultActiveSample
            ? "columns-1 space-y-4 sticky top-16"
            : "px-2 flex flex-wrap justify-center gap-8"
        }`}
      >
        {samplesPreviews?.map((samplePreview) => (
          <li key={samplePreview.title}>
            <ArticleCard
              title={samplePreview.title}
              image={samplePreview.image}
              path={samplePreview.path}
              slug={samplePreview.slug}
            />
          </li>
        ))}
      </ul>
      {defaultSamplesStructure && (
        <SampleCodeContextProvider>
          <CodeSample
            defaultActiveSample={defaultActiveSample}
            defaultSamplesStructure={defaultSamplesStructure}
          />
        </SampleCodeContextProvider>
      )}
    </div>
  );
}
