import { createSlice } from "@reduxjs/toolkit/";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      state.cartTotalAmount += action.payload.price;

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
      //state.cartItems.push(action.payload);
    },
    removeFromCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      state.cartTotalAmount -= action.payload.price;
      if (state.cartTotalAmount < 0) state.cartTotalAmount = 0;

      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else {
        state.cartItems.splice(itemIndex, 1);
      }
      //state.cartItems.push(action.payload);
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
