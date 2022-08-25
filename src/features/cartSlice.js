import { createSlice } from "@reduxjs/toolkit/";

//initial state of the cart
const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add to cary action
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
    },
    //remove from cary action
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
    },
    //empty cary action
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
