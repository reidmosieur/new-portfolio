import ArticlesContainer from "@/components/articles/container";
import { ArticlesContextProvider } from "@/components/articles/context/articlesStateProvider";
import Layout from "@/layout/main";
import MyWorkDataProvider from "./data/provider";
import { ArticlePreview } from "@/components/articles/types/types";

type MyWorkProps = {
    articlePreviews: ArticlePreview[],
}

const Page = ({ articlePreviews }: MyWorkProps) => {
    return (
        <Layout>
            <ArticlesContextProvider>
                <MyWorkDataProvider articles={articlePreviews} >
                    <ArticlesContainer />
                </MyWorkDataProvider>
            </ArticlesContextProvider>
        </Layout>
    )
};

export async function getServerSideProps() {
    // Fetch articles data here
    const articlePreviews = (await import('./data/myWorkPreviews.json')).default;

    return {
        props: {
            articlePreviews,
        },
    };
}

export default Page;