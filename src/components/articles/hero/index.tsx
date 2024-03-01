import Image from "next/image"
import { useArticlesContext } from "../context/articlesStateContext";

const ArticleHero = () => {
    const {
        article,
    } = useArticlesContext();

    if (article) {
        return (
            <div className="columns-1 space-y-2" >
                <Image 
                    src={article.image.src} 
                    alt={article.image.alt} 
                    width={article.image.width} 
                    height={article.image.height}
                    className="w-full aspect-video"
                />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold" >{article.title}</h1>
                <h2 className="text-sm sm:text-base lg:text-lg" >{article.description}</h2>
            </div>
        )
    }
}

export default ArticleHero;