import { useArticlesContext } from "@/components/articles/context/articlesStateContext";
import { Article, ArticlePreview } from "@/components/articles/types/types";
import { ReactNode, useEffect } from "react";

type MyWorkDataProvider = {
    children: ReactNode,
    slug?: string,
    articles?: ArticlePreview[],
    article?: Article,
}

const MyWorkDataProvider = ({
    children,
    slug,
    articles,
    article,
}: MyWorkDataProvider) => {
    const {
        setArticlePreviews,
        setArticle
    } = useArticlesContext();

    useEffect(() => {
        if (articles) {
            setArticlePreviews(articles);
        } else {
            import("../myWorkPreviews.json").then((module) => {
                const data: ArticlePreview[] = module.default;
    
                setArticlePreviews(data);
            })
        }
    }, [])

    useEffect(() => {
        if (article) {
            setArticle(article);
        } else {
            if (slug) {
                try {
                    import(`../articles/${slug}.json`)
                    .then((module) => {
                        const data: Article = module.default;
    
                        setArticle(data);
                    })
                    .catch(err => console.error(err));
                } catch (err: any) {
                    console.error(err);
                }
            }
        }
    }, [slug])

    return children;
};

export default MyWorkDataProvider;