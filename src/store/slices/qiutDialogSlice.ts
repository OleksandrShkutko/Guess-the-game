import { createSlice } from '@reduxjs/toolkit';

const qiutGialogSlice = createSlice({
  name: 'qiutDialog',
  initialState: {
    isQiutDialogOpen: false,
  },
  reducers: {
    openQiutDialog(state) {
      state.isQiutDialogOpen = true;
    },
    closeQiutDialog(state) {
      state.isQiutDialogOpen = false;
    },
  },
});

export const { openQiutDialog, closeQiutDialog } = qiutGialogSlice.actions;
export default qiutGialogSlice.reducer;
