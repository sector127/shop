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

      // Check if an item with the same attributes exists in the cart
      const existingItem = state.items.find((item) => {
        if (item.id === newItem.id) {
          // Compare attributes
          if (
            item.selectedAttributes?.length ===
            newItem.selectedAttributes?.length
          ) {
            return item.selectedAttributes.every((attr1) =>
              newItem.selectedAttributes.some(
                (attr2) =>
                  attr1.name === attr2.name && attr1.value === attr2.value
              )
            );
          }
        }
        return false;
      });

      if (existingItem) {
        // If the item already exists, update its quantity and total price
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        // If the item doesn't exist, add it to the cart
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
      }

      state.totalQuantity++;
      state.cartTotalPrice += newItem.price;
    },

    removeItemCart(state, action) {
      const { id, selectedAttributes } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => {
        if (item.id === id) {
          // Compare attributes
          if (item.selectedAttributes?.length === selectedAttributes?.length) {
            return item.selectedAttributes.every((attr1) =>
              selectedAttributes.some(
                (attr2) =>
                  attr1.name === attr2.name && attr1.value === attr2.value
              )
            );
          }
        }
        return false;
      });

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];

        state.totalQuantity--;

        if (existingItem.quantity === 1) {
          // If the quantity is 1, remove only the targeted item
          state.items.splice(existingItemIndex, 1);
        } else {
          // If the quantity is greater than 1, decrement the quantity and update totalPrice
          existingItem.quantity--;
          existingItem.totalPrice =
            existingItem.totalPrice - existingItem.price;
        }

        // Update cartTotalPrice by subtracting the price of the removed item
        state.cartTotalPrice = state.cartTotalPrice - existingItem.price;
      }
    },
    selectAttribute(state, action) {
      const { id, attrName, itemValue } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Find the specific attribute object in the selectedAttributes array
        const attributeToUpdate = existingItem.selectedAttributes.find(
          (attr) => attr.name === attrName
        );

        if (attributeToUpdate) {
          // Update the value if the attribute already exists
          attributeToUpdate.value = itemValue;
        } else {
          // Add the attribute if it doesn't exist for the item
          existingItem.selectedAttributes.push({
            name: attrName,
            value: itemValue,
          });
        }
      }
    },

    selectCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
