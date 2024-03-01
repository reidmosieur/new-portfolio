type ArticleImage = {
    src: string;
    alt: string;
    width: number;
    height: number;
}

type ArticlePreview = {
    title: string;
    image: ArticleImage;
    path: string;
    slug: string;
}

type Article = {
    title: string;
    description: string;
    image: ArticleImage;
    markdown: string;
    slug: string;
}

export type { ArticlePreview, ArticleImage, Article };