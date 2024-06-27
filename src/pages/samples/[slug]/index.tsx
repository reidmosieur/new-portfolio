import { ArticlePreview } from "@/components/articles/types/types";
import findLeastNestedItem from "@/components/sample/helpers/findLeastNestedFile";
import { Folder, File } from "@/components/sample/types/types";
import Samples from "@/components/samples";
import Layout from "@/layout/main";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";

type MyWorkProps = {
  samplesPreviews: ArticlePreview[];
  headerJsonName: string;
};

const Page = ({ samplesPreviews, headerJsonName }: MyWorkProps) => {
  const [defaultSampleStructure, setDefaultSampleStructure] = useState<
    Folder | undefined
  >(undefined);

  useEffect(() => {
    import(`../../../components/sample/data/headers/${headerJsonName}.json`)
      .then((module) => {
        const header: Folder = module.default;
        const leastNestedFile: File | undefined = findLeastNestedItem(
          header,
          "file"
        );

        const setActiveOnLeastNestedFile = (folderOrFile: {
          name?: string;
          files?: any[];
          folder?: any[];
        }) => {
          if (Array.isArray(folderOrFile)) {
            folderOrFile.forEach(setActiveOnLeastNestedFile);
          } else if (folderOrFile && folderOrFile.files) {
            folderOrFile.files.forEach((file: { id: any; active: boolean }) => {
              if (leastNestedFile && file.id === leastNestedFile.id) {
                file.active = true;
              }
            });
            if (folderOrFile.folder) {
              folderOrFile.folder.forEach(setActiveOnLeastNestedFile);
            }
          }
        };

        setActiveOnLeastNestedFile(header);

        setDefaultSampleStructure(header);
      })
      .catch((error) => {
        console.error("Error loading header JSON:", error);
      });
  }, [headerJsonName]);

  return (
    <Layout>
      <Samples
        samplesPreviews={samplesPreviews}
        defaultSamplesStructure={defaultSampleStructure}
      />
    </Layout>
  );
};

export async function getServerSideProps({ params }: any) {
  const slug = params.slug;

  const samplesPreviews = (await import("@/data/samples/samplesPreviews.json"))
    .default;

  const headerJsonName = samplesPreviews.find(
    (preview) => preview.slug === slug
  )?.headerJsonName;

  if (!headerJsonName) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      samplesPreviews,
      headerJsonName,
    },
  };
}

export default Page;
