const API = 'https://api.imdbapi.dev';

export type Movie = {
  id: string;
  originalTitle?: string;
  primaryImage?: {
    url?: string;
  } | null;
  description?: string | null;
  plot?: string | { plotText?: string } | null;
  releaseDate?: {
    year?: number;
  } | null;
  startYear?: number | null;
  rating?: {
    aggregateRating?: number;
    voteCount?: number;
  } | null;
  genres?: {
    genres?: Array<{ text?: string }>;
  } | null;
  runtimeSeconds?: number | null;
};

type SearchResponse = {
  titles?: Movie[];
  results?: Movie[];
};

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function searchMovies(query: string, limit = 24): Promise<Movie[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const data = await request<SearchResponse>(
    `/search/titles?query=${encodeURIComponent(normalizedQuery)}&limit=${limit}`,
  );

  return data.titles ?? data.results ?? [];
}

export async function getMovieById(id: string): Promise<Movie> {
  return request<Movie>(`/titles/${id}`);
}
