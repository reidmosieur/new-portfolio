import { createContext, useContext, useState, useEffect } from 'react';
import { Article, ArticlePreview } from '../types/types';

interface ArticlesContextValue {
    articlePreviews: ArticlePreview[],
    article: Article | undefined,
    setArticlePreviews: React.Dispatch<React.SetStateAction<ArticlePreview[]>>,
    setArticle: React.Dispatch<React.SetStateAction<Article | undefined>>
}

const ArticlesContext = createContext<ArticlesContextValue | undefined>(undefined);

export const useArticlesContext = () => {
    const context = useContext(ArticlesContext);
    if (!context) {
        throw new Error('useArticlesContext must be used within a GameProvider');
    }
    return context;
};

export default ArticlesContext;