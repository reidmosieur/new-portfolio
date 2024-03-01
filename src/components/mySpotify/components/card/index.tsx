import { ArtistObject } from "@/components/mySpotify/types/types";
import Image from "next/image";

type CardProps = {
    name: string,
    image: {
        url: string,
        height: number | null,
        width: number | null,
    },
    genres?: string[],
    artist?: string,
}

const Card = ({
    name,
    image,
    genres,
    artist,
}: CardProps) => {
    return (
        <li className="rounded overflow-hidden" >
            <div className="w-fit h-fit p-4 flex flex-col flex-wrap gap-2 bg-stone-900" >
                {image && <Image src={image.url} alt={name || 'Artist'} width={200} height={200} />}
                <h4 className="max-w-[200px] font-bold" >{name}</h4>
                {genres && <small className="max-w-[200px]" >{genres.join(', ')}</small>}
                {artist && <small className="max-w-[200px]" >{artist}</small>}
            </div>
        </li>
    )
};

export default Card;