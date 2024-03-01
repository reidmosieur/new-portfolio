import { ArticlesContextProvider } from "@/components/articles/context/articlesStateProvider";
import Layout from "@/layout/main";
import MyWorkDataProvider from "../data/provider";
import { useRouter } from "next/router";
import ArticlesContainer from "@/components/articles/container";
import { Article, ArticlePreview } from "@/components/articles/types/types";
import { GetServerSideProps } from "next";

type WorkArticlePage = {
    articlePreviews: ArticlePreview[],
    articleContent: Article,
}

const ArticlePage = ({ articlePreviews, articleContent }: WorkArticlePage) => {
    const router = useRouter();

    const slug = router.query.slug;
    const formattedSlug = typeof slug === 'object' ? slug.join('') : slug;

    return (
        <Layout>
            <ArticlesContextProvider>
                <MyWorkDataProvider
                    slug={formattedSlug}
                    articles={articlePreviews}
                >
                    <ArticlesContainer />
                </MyWorkDataProvider>
            </ArticlesContextProvider>
        </Layout>
    )
};

export async function getServerSideProps({ params }: any) {
    const slug = params.slug;

    // Fetch article data here based on the slug
    const articlePreviews = (await import('../data/myWorkPreviews.json')).default;
    const articleContent = (await import(`../data/articles/${slug}.json`)).default;

    return {
        props: {
            articlePreviews,
            articleContent,
        },
    };
}

export default ArticlePage;