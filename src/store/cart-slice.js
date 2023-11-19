import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    cartTotalPrice: 0,
    currency: { currency: "$" },
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          prices: newItem.prices,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          brand: newItem.brand,
          attributes: newItem.attributes,
          gallery: newItem.gallery,
          selectedAttributes: newItem.selectedAttributes ?? [],
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      }
      state.cartTotalPrice = state.cartTotalPrice + newItem.price;
    },
    removeItemCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.cartTotalPrice = state.cartTotalPrice - existingItem.price;
    },
    selectAttribute(state, action) {
      const newAttribute = {
        name: action.payload.attrName,
        value: action.payload.itemValue,
      };
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);
      const indexOfObject = existingItem.selectedAttributes.findIndex(
        (inCartAttr) => inCartAttr.name === newAttribute.name
      );
      if (
        existingItem.selectedAttributes.some(
          (s) => s.name === newAttribute.name && s.value === newAttribute.value
        )
      ) {
        existingItem.selectedAttributes.splice(indexOfObject, 1);
      } else if (
        existingItem.selectedAttributes.some(
          (s) => s.name === newAttribute.name
        )
      ) {
        existingItem.selectedAttributes.splice(indexOfObject, 1);
        existingItem.selectedAttributes.push(newAttribute);
      } else existingItem.selectedAttributes.push(newAttribute);
    },
    selectCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
