import { configureStore } from '@reduxjs/toolkit';
import gameScoreReducer, { setGameScoreResult } from './slices/gameScoreSlice';
import gameButtonsGridSliceReducer, {
  setRightAnswer,
  setAnswer,
} from './slices/gameButtonsGridSlice';
import qiutGialogSliceReducer, {
  openQiutDialog,
  closeQiutDialog,
} from './slices/qiutDialogSlice';
import gameSettingsReducer, {
  setSelectedPlatformIds,
  creareRequestUrl,
} from './slices/gameSettingsSlice';

export type StoreType = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    gameScore: gameScoreReducer,
    gameButtonsGrid: gameButtonsGridSliceReducer,
    qiutDialog: qiutGialogSliceReducer,
    settings: gameSettingsReducer,
  },
});

export {
  store,
  setGameScoreResult,
  setRightAnswer,
  setAnswer,
  openQiutDialog,
  closeQiutDialog,
  setSelectedPlatformIds,
  creareRequestUrl,
};
