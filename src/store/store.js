import { configureStore } from "@reduxjs/toolkit";

import { currenciesSlice } from "./reducers/currenciesSlice";

export default configureStore({
  reducer: {
    currencies: currenciesSlice,
  },
});
