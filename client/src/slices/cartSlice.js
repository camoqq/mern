import { createSlice } from "@reduxjs/toolkit";
import UpdateCart from "../utils/UpdateCart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: [], payment: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const item = action.payload;
      const itemExists = state.cartItems.find((x) => x._id === item._id);

      // This checks whether or not the item exists and if not then x is
      // returned but if it does then it gets mapped into a new array
      if (itemExists) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === itemExists._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return UpdateCart(state);
    },
    remove: (state, action) => {
      const item = action.payload;
      //                                            no need for item._id
      //                                        action.payload is the id
      state.cartItems = state.cartItems.filter((x) => x._id !== item);
      return UpdateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    resetCart: (state) => (state = initialState),
  },
});
export const {
  add,
  remove,
  saveShippingAddress,
  clearCartItems,
  savePaymentMethod,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
