const API ='https://api.imdbapi.dev';

export type Movie = {
    id: string;
    primaryTitle?: string;
    originalTitle?: string;
    primaryImage?: {
        url?: string;
    };
    plot?: string;
};

export const boardMovies = async () => {
     const res = await fetch(`${API}/titles`);
    return res.json();
}

export const searchMovies = async (query: string = '', limit = 50) => {
    const res = await fetch (`${API}/search/titles?query=${query}&limit=${limit}`);
    return res.json();
}

export const getMovieById = async (id: string) => {
    const res = await fetch(`${API}/titles/${id}`);
    return res.json();

}
