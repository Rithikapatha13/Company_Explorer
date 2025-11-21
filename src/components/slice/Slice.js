import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyServices from "../services/companyServices";


export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async (_, thunkAPI) => {
    try {
     const data = await companyServices.getAllCompanies();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const CompanySlice=createSlice({
    name:"company",
    initialState:{
    companies:null,
    loading: false,
    error: null,
    },
reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    }
})



export default CompanySlice.reducer