import { createSlice } from '@reduxjs/toolkit';
import { API_ROUTE, API_KEY, PLATFORMS } from '../../constants';

const selectedPlatformsFromStorage = localStorage.getItem('selectedPlatforms')
  ? JSON.parse(localStorage.getItem('selectedPlatforms') as string)
  : null;
const selectedGenresFromStorage = localStorage.getItem('selectedGenres')
  ? JSON.parse(localStorage.getItem('selectedGenres') as string)
  : null;
const selectedDatesRangeFromStorage = localStorage.getItem('selectedDatesRange')
  ? JSON.parse(localStorage.getItem('selectedDatesRange') as string)
  : null;
const requestUrlFromStorage = localStorage.getItem('requestUrl');

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState: {
    requestUrl: requestUrlFromStorage || `${API_ROUTE}/games?key=${API_KEY}`,
    selectedPlatforms: (selectedPlatformsFromStorage || []) as string[],
    selectedGenres: (selectedGenresFromStorage || []) as string[],
    selectedDatesRange: (selectedDatesRangeFromStorage || []) as string[],
  },
  reducers: {
    setSelectedPlatformIds(state, action) {
      state.selectedPlatforms = action.payload;
      localStorage.setItem('selectedPlatforms', JSON.stringify(action.payload));
    },
    setSelectedGenresIds(state, action) {
      state.selectedGenres = action.payload;
      localStorage.setItem('selectedGenres', JSON.stringify(action.payload));
    },
    setSelectedDatesRange(state, action) {
      state.selectedDatesRange = action.payload;
      localStorage.setItem(
        'selectedDatesRange',
        JSON.stringify(action.payload)
      );
    },
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

      const additiondalQueryStrings = `${platformQuerySting}${genresQuerySting}${datesQuerySting}`;

      const requestUrl = `${API_ROUTE}/games?key=${API_KEY}${additiondalQueryStrings}`;

      state.requestUrl = requestUrl;
      localStorage.setItem('requestUrl', requestUrl);
    },
  },
});

export const {
  setSelectedPlatformIds,
  creareRequestUrl,
  setSelectedGenresIds,
  setSelectedDatesRange,
} = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
