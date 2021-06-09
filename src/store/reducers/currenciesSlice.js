import { createSlice } from "@reduxjs/toolkit";

const sliceName = "currencies";

export const currenciesSlice = createSlice({
  name: sliceName,
  initialState: {
    data: [],
    loading: "idle",
  },
  reducers: {
    currenciesLoading: (state) => {
      if (state.loading === "idle") {
        return {
          ...state,
          loading: "pending",
        };
      }
    },
    addCurrency: (state, action) => {
      // Need currency object pass as payload
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.payload,
          },
        ],
        loading: "idle",
      };
    },
    initCurrencies: (state, action) => {
      return {
        ...state,
        data: [...action.payload],
        loading: "idle",
      };
    },
    removeCurrency: (state, action) => {
      // Need currency id pass as payload
      return {
        ...state,
        data: state.data.filter((c) => c.id !== action.payload),
        loading: "idle",
      };
    },
    editCurrency: (state, action) => {
      // Need currency object pass as payload
      return {
        ...state,
        data: state.data.map((c) => {
          if (action.payload.id === c.id) {
            return action.payload;
          }

          return c;
        }),
        loading: "idle",
      };
    },
  },
});

export const { addCurrency, removeCurrency, editCurrency, initCurrencies, currenciesLoading } =
  currenciesSlice.actions;

export const currenciesSelector = (state) => state[sliceName];

export default currenciesSlice.reducer;
