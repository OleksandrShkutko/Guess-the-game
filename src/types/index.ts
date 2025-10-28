export type Game = {
  id: number;
  name: string;
  background_image: string;
  ganres: Genres;
};

export type Genres = number[];

export type GamesNames = string[];

export type ButtonColor =
  | 'error'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning';
