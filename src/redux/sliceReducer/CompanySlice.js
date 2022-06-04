import { createSlice } from "@reduxjs/toolkit";
const CompanySlice = createSlice({
  name: "Company",
  initialState: {
    loading: false,
    companyInfo: null,
    error: false,
  },
  reducers: {
    CompanyStart: (state, action) => {
      state.loading = true;
    },
    CompanySuccess: (state, action) => {
      state.loading = false;
      state.companyInfo = action.payload;
    },
    CompanyError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    CompanyReset: (state) => {
      state.loading = false;
      state.companyInfo = null;
      state.error = false;
    },
  },
});
export const { CompanyStart, CompanySuccess, CompanyError, CompanyReset } =
  CompanySlice.actions;
export default CompanySlice.reducer;
