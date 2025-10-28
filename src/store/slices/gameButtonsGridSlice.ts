import { createSlice } from '@reduxjs/toolkit';

const gameButtonsGridSlice = createSlice({
  name: 'buttonGridSlice',
  initialState: {
    rightAnswer: '',
    answer: '',
  },
  reducers: {
    setRightAnswer(state, action) {
      state.rightAnswer = action.payload;
    },
    setAnswer(state, action) {
      state.answer = action.payload;
    },
  },
});

export const { setRightAnswer, setAnswer } = gameButtonsGridSlice.actions;
export default gameButtonsGridSlice.reducer;
