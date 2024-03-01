import Image from "next/image"
import { ArticleImage } from "../types/types";
import Link from "next/link";

interface ArticleCardProps {
    title: string,
    image: ArticleImage,
    path: string,
    slug: string,
}

const ArticleCard = ({
    title,
    image,
    path,
    slug,
}: ArticleCardProps) => {
    if (title && image && path && slug) {
        return (
            <div
                className="w-full max-w-xs rounded-md border-2 border-stone-900"
            >
                <Link
                    href={`${path}${slug}`}
                >
                    <Image
                        className="w-[316px] aspect-video rounded-t-md"
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                    />
                    <h2 className="px-4 py-1 sm:text-lg lg:text-xl font-bold bg-stone-900 rounded-b-md" >{title}</h2>
                </Link>
            </div>
        )
    }

    return (
        <div
            className="w-full max-w-xs rounded-md border-2 border-stone-900 animate-pulse"
        >
            <div
                className="w-[316px] aspect-video rounded-t-md"
            >
            </div>
            <div className="px-4 py-4 sm:text-lg lg:text-xl font-bold bg-stone-900 rounded-b-md" >
                <div className="h-2 w-32 bg-stone-700 rounded col-span-2"></div>
            </div>
        </div>
    )
}

export default ArticleCard;