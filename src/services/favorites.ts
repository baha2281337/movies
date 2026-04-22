export const addToFavorites = (movieId: string) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];

  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (movieId: string) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];
  const updatedFavorites = favorites.filter((id) => id !== movieId);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const getFavorites = (): string[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]') as string[];
};
