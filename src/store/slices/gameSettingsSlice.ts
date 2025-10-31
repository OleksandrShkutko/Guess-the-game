import { createSlice } from '@reduxjs/toolkit';
import { API_ROUTE, API_KEY, PLATFORMS } from '../../constants';

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState: {
    requestUrl: `${API_ROUTE}/games?key=${API_KEY}`,
    selectedPlatforms: [] as string[],
    selectedGenres: [] as string[],
  },
  reducers: {
    setSelectedPlatformIds(state, action) {
      state.selectedPlatforms = action.payload;
    },
    setSelectedGenresIds(state, action) {
      state.selectedGenres = action.payload;
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

      const additiondalQueryStrings = `${platformQuerySting}${genresQuerySting}`;

      state.requestUrl = `${API_ROUTE}/games?key=${API_KEY}${additiondalQueryStrings}`;
    },
  },
});

export const {
  setSelectedPlatformIds,
  creareRequestUrl,
  setSelectedGenresIds,
} = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
