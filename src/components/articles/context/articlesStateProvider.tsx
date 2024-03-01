import { ReactNode, useState } from "react";
import ArticlesContext from "./articlesStateContext";
import { Article, ArticlePreview } from "../types/types";

export const ArticlesContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [articlePreviews, setArticlePreviews] = useState<ArticlePreview[]>([]);
    const [article, setArticle] = useState<Article | undefined>(undefined);

    return (
        <ArticlesContext.Provider value={{
            articlePreviews,
            article,
            setArticlePreviews,
            setArticle,
        }}>
            {children}
        </ArticlesContext.Provider>
    );
};