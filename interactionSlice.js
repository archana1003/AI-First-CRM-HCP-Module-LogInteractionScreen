import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hcpName: '',
  type: 'F2F',
  summary: '',
  followUpDate: '',
  status: 'idle' // idle, loading, success
};

export const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    syncFromAI: (state, action) => {
      // Merges AI-detected entities into the current form state
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { updateField, syncFromAI, resetForm } = interactionSlice.actions;
export default interactionSlice.reducer;