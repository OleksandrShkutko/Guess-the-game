// API constants
export const API_ROUTE = 'https://api.rawg.io/api';
export const API_KEY = '88e766ec5eab4f58a54e1dd4b35321d2';
export const DEFAULT_QUERY_FOR_ONE_GAME = '&page_size=1';

// Platform constants
export type PlatformsSelectionVariant = 'all' | 'select';
type PlatformsSelectionItem = {
  value: PlatformsSelectionVariant;
  label: string;
};
type PlatformsSelection = {
  [K in PlatformsSelectionVariant]: PlatformsSelectionItem;
};
type Platforms = { [key: string]: number[] };

export const PLATFORMS_SESECTIONS: PlatformsSelection = {
  all: { value: 'all', label: 'All Platforms' },
  select: { value: 'select', label: 'Select Manually' },
};
export const PLATFORMS: Platforms = {
  PC: [4, 5, 6, 41, 55],
  PlayStation: [187, 18, 16, 15, 27, 19, 17],
  Xbox: [1, 14, 80, 186],
  Nintendo: [7, 8, 9, 13, 10, 11, 105, 83, 24, 43, 26, 79, 49],
  Sega: [167, 107, 117, 119, 74, 106, 77],
  Mobile: [3, 21],
  Atari: [28, 31, 23, 22, 25, 34, 46, 50],
};
