import ArticleCard from "../../card";
import { useArticlesContext } from "../../context/articlesStateContext";

const ArticleListContainer = () => {
    const {
        articlePreviews,
        article,
    } = useArticlesContext();

    return (
      <ul
        className={`max-w-xs md:container h-fit mx-auto ${
          article
            ? "columns-1 space-y-4 sticky top-16"
            : "px-2 flex flex-wrap justify-center gap-8"
        }`}
      >
        {articlePreviews.map((articlePreview) => (
          <li key={articlePreview.title}>
            <ArticleCard
              title={articlePreview.title}
              image={articlePreview.image}
              path={articlePreview.path}
              slug={articlePreview.slug}
            />
          </li>
        ))}
      </ul>
    );
}

export default ArticleListContainer;