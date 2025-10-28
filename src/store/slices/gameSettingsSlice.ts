import { createSlice } from '@reduxjs/toolkit';
import { API_ROUTE, API_KEY, PLATFORMS } from '../../constants';

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState: {
    requestUrl: `${API_ROUTE}/games?key=${API_KEY}`,
    selectedPlatforms: [] as string[],
  },
  reducers: {
    setSelectedPlatformIds(state, action) {
      state.selectedPlatforms = action.payload;
    },
    creareRequestUrl(state) {
      const platformsIds = state.selectedPlatforms
        .map((platform) => PLATFORMS[platform])
        .flat();

      state.requestUrl = `${API_ROUTE}/games?key=${API_KEY}${
        state.selectedPlatforms.length > 0
          ? `&platforms=${platformsIds.join(',')}`
          : ''
      }`;
    },
  },
});

export const { setSelectedPlatformIds, creareRequestUrl } =
  gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
