import { ArticlesContextProvider } from "./context/articlesStateProvider";

const Articles = (children: any) => {
    return (
        <ArticlesContextProvider>
            {children}
        </ArticlesContextProvider>
    )
};

export default Articles;