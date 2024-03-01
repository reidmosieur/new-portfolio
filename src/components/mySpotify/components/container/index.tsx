import { ArtistObject, TopItems, TrackObject } from "@/components/mySpotify/types/types";
import Card from "../card";
import { useSpotifyContext } from "../../context/spotifyStateContext";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Sample from "@/components/sample";

const GridCardContainer = ({
    children,
}: {
    children: ReactNode,
}) => {
    return (
        <ul className="w-fit h-fit mx-auto columns-1 xl:columns-2 space-y-4" >
            {children}
        </ul>
    )
}

const MyTopSpotifyContainer = () => {
    const {
        myTopItems,
    } = useSpotifyContext();

    const myTopArtists = myTopItems.find((item: TopItems) => item.itemsType === 'artists')?.items;
    const myTopTracks = myTopItems.find((item: TopItems) => item.itemsType === 'tracks')?.items;

    return (
        <section className="relative w-fit mx-auto flex flex-col flex-wrap gap-8 text-[#76d962]" >
            <span className="flex flex-nowrap gap-2 justify-between" >
                <h2 className="text-xl sm:text-2xl lg:text-3xl" >What I've been listening to:</h2>
                <Image src={"/spotify-icon.png"} alt={"My listening data courtesy of Spotify"} width={40} height={40} />
            </span>
            <div 
                className="max-h-96 px-4 overflow-y-scroll flex flex-wrap justify-center gap-16 spotify-scrollbar"
            >
                {myTopArtists &&
                    <div className="flex flex-col flex-wrap gap-4" >
                        <span className="text-lg" >My top artists:</span>
                        <GridCardContainer>
                            {myTopArtists.map((item: ArtistObject | TrackObject) => {
                                if ('genres' in item) {
                                    return (
                                        <Card
                                            key={item.name}
                                            name={item.name}
                                            image={item.images![0]}
                                            genres={item.genres}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </GridCardContainer>
                    </div>
                }
                {myTopTracks &&
                    <div className="flex flex-col flex-wrap gap-4" >
                        <span className="text-lg" >My top tracks:</span>
                        <GridCardContainer>
                            {myTopTracks.map((item: ArtistObject | TrackObject) => {
                                if ('album' in item) {
                                    return (
                                        <Card
                                            key={item.name}
                                            name={item.name}
                                            image={item.album!.images[0]}
                                            artist={item.album!.artists[0].name}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </GridCardContainer>
                    </div>
                }
            </div>
            <small className="text-stone-300 text-center" >Data courtesy of <Link href={'https://www.spotify.com'} className="underline text-[#76d962]" >Spotify</Link></small>
            <Sample headerJsonName="mySpotify" />
        </section>
    )
};

export default MyTopSpotifyContainer;