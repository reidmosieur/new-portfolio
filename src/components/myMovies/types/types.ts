type Result = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    rating: number;
}

type RatedMovies = {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

type CurrentPagination = {
    currentPage: number;
    currentSort: 'created_at.asc' | 'created_at.desc';
}

export type { RatedMovies, Result, CurrentPagination };