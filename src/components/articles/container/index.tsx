import { useArticlesContext } from "../context/articlesStateContext";
import ArticleContainer from "./article";
import ArticleListContainer from "./list";

const ArticlesContainer = () => {
    const {
        article,
    } = useArticlesContext();

    return (
        <div className="max-w-xs sm:container mx-auto flex flex-col-reverse xl:flex-row gap-24 justify-center" >
            <ArticleListContainer />
            {article && <ArticleContainer />}
        </div>
    )
}

export default ArticlesContainer;