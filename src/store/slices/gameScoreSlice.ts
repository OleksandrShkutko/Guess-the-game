import { createSlice } from '@reduxjs/toolkit';

const gameScoreSlice = createSlice({
  name: 'gameScore',
  initialState: {
    bestGameScore: 0,
  },
  reducers: {
    setGameScoreResult(state, action) {
      if (action.payload > state.bestGameScore) {
        state.bestGameScore = action.payload;
      }
    },
  },
});

export const { setGameScoreResult } = gameScoreSlice.actions;
export default gameScoreSlice.reducer;
