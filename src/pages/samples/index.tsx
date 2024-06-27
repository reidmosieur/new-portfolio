import { ArticlePreview } from "@/components/articles/types/types";
import Samples from "@/components/samples";
import Layout from "@/layout/main";

type MyWorkProps = {
  samplesPreviews: ArticlePreview[];
};

const Page = ({ samplesPreviews }: MyWorkProps) => {
  return (
    <Layout>
      <Samples samplesPreviews={samplesPreviews} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const samplesPreviews = (await import("@/data/samples/samplesPreviews.json"))
    .default;

  return {
    props: {
      samplesPreviews,
    },
  };
}

export default Page;
