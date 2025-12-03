import { configureStore } from '@reduxjs/toolkit';
import gameScoreReducer, {
  setGameScoreResult,
  resetScoreResult,
} from './slices/gameScoreSlice';
import gameButtonsGridSliceReducer, {
  setRightAnswer,
  setAnswer,
} from './slices/gameButtonsGridSlice';
import qiutGialogSliceReducer, {
  openQiutDialog,
  closeQiutDialog,
} from './slices/qiutDialogSlice';
import gameSettingsReducer, {
  openSettingsDialog,
  closeSettingsDialog,
  setSelectedPlatformIds,
  setSelectedGenresIds,
  setSelectedDatesRange,
  setSelectedMetacriticRating,
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
  resetScoreResult,
  setRightAnswer,
  setAnswer,
  openQiutDialog,
  closeQiutDialog,
  openSettingsDialog,
  closeSettingsDialog,
  setSelectedPlatformIds,
  setSelectedGenresIds,
  setSelectedDatesRange,
  setSelectedMetacriticRating,
  creareRequestUrl,
};
