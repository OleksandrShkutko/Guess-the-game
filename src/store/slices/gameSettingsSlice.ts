import { createSlice } from '@reduxjs/toolkit';
import { API_ROUTE, API_KEY, PLATFORMS } from '../../constants';

// Retrieve initial state from localStorage
const selectedPlatformsFromStorage = localStorage.getItem('selectedPlatforms')
  ? JSON.parse(localStorage.getItem('selectedPlatforms') as string)
  : null;
const selectedGenresFromStorage = localStorage.getItem('selectedGenres')
  ? JSON.parse(localStorage.getItem('selectedGenres') as string)
  : null;
const selectedDatesRangeFromStorage = localStorage.getItem('selectedDatesRange')
  ? JSON.parse(localStorage.getItem('selectedDatesRange') as string)
  : null;
const selectedMetacriticRatingFromStorage = localStorage.getItem(
  'selectedMetacriticRating'
)
  ? JSON.parse(localStorage.getItem('selectedMetacriticRating') as string)
  : null;
const additiondalQueryStrings =
  localStorage.getItem('additiondalQueryStrings') || '';

// Create the slice
const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState: {
    isSettingsDialogOpen: false,
    requestUrl: `${API_ROUTE}/games?key=${API_KEY}${additiondalQueryStrings}`,
    selectedPlatforms: (selectedPlatformsFromStorage || []) as string[],
    selectedGenres: (selectedGenresFromStorage || []) as string[],
    selectedDatesRange: (selectedDatesRangeFromStorage || []) as string[],
    selectedMetacriticRating: (selectedMetacriticRatingFromStorage ||
      []) as number[],
  },
  reducers: {
    // Dialog open/close reducers
    openSettingsDialog(state) {
      state.isSettingsDialogOpen = true;
    },
    closeSettingsDialog(state) {
      state.isSettingsDialogOpen = false;
    },
    // Game settings reducers
    // Set selected platforms
    setSelectedPlatformIds(state, action) {
      state.selectedPlatforms = action.payload;
      localStorage.setItem('selectedPlatforms', JSON.stringify(action.payload));
    },
    // Set selected genres
    setSelectedGenresIds(state, action) {
      state.selectedGenres = action.payload;
      localStorage.setItem('selectedGenres', JSON.stringify(action.payload));
    },
    // Set selected dates range
    setSelectedDatesRange(state, action) {
      state.selectedDatesRange = action.payload;
      localStorage.setItem(
        'selectedDatesRange',
        JSON.stringify(action.payload)
      );
    },
    // Set selected metacritic rating
    setSelectedMetacriticRating(state, action) {
      state.selectedMetacriticRating = action.payload;
      localStorage.setItem(
        'selectedMetacriticRating',
        JSON.stringify(action.payload)
      );
    },
    // Create request URL
    creareRequestUrl(state) {
      const platformsIds = state.selectedPlatforms
        .map((platform) => PLATFORMS[platform])
        .flat();

      const platformQuerySting =
        state.selectedPlatforms.length > 0
          ? `&platforms=${platformsIds.join(',')}`
          : '';

      const genresQuerySting =
        state.selectedGenres.length > 0
          ? `&genres=${state.selectedGenres.join(',')}`
          : '';

      const datesQuerySting =
        state.selectedDatesRange.length > 0
          ? `&dates=${state.selectedDatesRange.join(',')}`
          : '';

      const metacriticQueryString =
        state.selectedMetacriticRating.length === 2
          ? `&metacritic=${state.selectedMetacriticRating[0]},${state.selectedMetacriticRating[1]}`
          : '';

      const additiondalQueryStrings = `${platformQuerySting}${genresQuerySting}${datesQuerySting}${metacriticQueryString}`;

      const requestUrl = `${API_ROUTE}/games?key=${API_KEY}${additiondalQueryStrings}`;

      state.requestUrl = requestUrl;
      localStorage.setItem('additiondalQueryStrings', additiondalQueryStrings);
    },
  },
});

export const {
  openSettingsDialog,
  closeSettingsDialog,
  setSelectedPlatformIds,
  creareRequestUrl,
  setSelectedGenresIds,
  setSelectedDatesRange,
  setSelectedMetacriticRating,
} = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
