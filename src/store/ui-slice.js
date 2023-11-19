const { createSlice } = require("@reduxjs/toolkit");

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, currencyIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    toggleCurrency(state) {
      state.currencyIsVisible = !state.currencyIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
