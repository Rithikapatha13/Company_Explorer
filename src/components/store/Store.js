import { configureStore } from '@reduxjs/toolkit'
import companyReducer from "../slice/Slice"

export const store = configureStore({
  reducer: {
    company:companyReducer
  },
})