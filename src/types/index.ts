export type Game = {
  id: number;
  name: string;
  image: string;
  ganres: Genres;
};

export type Genres = (number | string)[];

export type GamesNames = string[];

export type ButtonColor =
  | 'error'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning';
