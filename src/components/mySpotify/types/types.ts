type ImageObject = {
    url: string;
    height: number | null;
    width: number | null;
};

type ExternalUrls = {
    spotify: string;
};

type Followers = {
    href: string | null;
    total: number;
};

type AlbumObject = {
    album_type: string;
    artists: ArtistObject[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
};

type ArtistObject = {
    external_urls: ExternalUrls;
    followers?: Followers;
    genres?: string[];
    href: string;
    id: string;
    images?: ImageObject[];
    name: string;
    popularity?: number;
    type: string;
    uri: string;
    album?: AlbumObject;
};

type ExternalIds = {
    isrc?: string;
    ean?: string;
    upc?: string;
};

type TrackObject = {
    album: AlbumObject;
    artists?: ArtistObject[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls[];
    external_ids: ExternalIds;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: object;
    restrictions: string[];
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
};

type TopItems = {
    href: string,
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
    items: ArtistObject[] | TrackObject[],
    itemsType: "artists" | "tracks",
}

export type { TopItems, ArtistObject, TrackObject };