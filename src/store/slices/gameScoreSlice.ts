import { createSlice } from '@reduxjs/toolkit';

const bestGameScoreFromStore = Number(localStorage.getItem('bestGameScore'));

const gameScoreSlice = createSlice({
  name: 'gameScore',
  initialState: {
    bestGameScore: bestGameScoreFromStore || 0,
  },
  reducers: {
    setGameScoreResult(state, action) {
      if (action.payload > state.bestGameScore) {
        state.bestGameScore = action.payload;
        localStorage.setItem('bestGameScore', action.payload);
      }
    },
    resetScoreResult(state) {
      state.bestGameScore = 0;
      localStorage.setItem('bestGameScore', '0');
    },
  },
});

export const { setGameScoreResult, resetScoreResult } = gameScoreSlice.actions;
export default gameScoreSlice.reducer;
