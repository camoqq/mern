import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

//   const add2decimals = (num)=>{
//     return Math.round((num*100)/100).toFixed(2)
//   }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const item = action.payload;
      const itemExists = state.cartItems.find((x) => x._id === item._id);
      // This checks whether or not the item exists and if not then x is returned but if it does then it gets mapped into a new array

      if (itemExists) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === itemExists._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //calculate items price
      state.itemsPrice = state.cartItems.reduce(
        (curr, acc) => curr + acc.price * acc.qty,
        0
      );
      //calculate shipping price(order over 100 free, else 10)
      state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
      //calculate tax price(15%)
      state.taxPrice = state.itemsPrice * 0.15;

      //calculate total price
      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
    remove: (state, action) => {
      const item = action.payload;
      //                                            no need for item._id
      //                                        action.payload is the id
      state.cartItems = state.cartItems.filter((x) => x._id !== item);
      //calculate items price
      state.itemsPrice = state.cartItems.reduce(
        (curr, acc) => curr + acc.price * acc.qty,
        0
      );
      //calculate shipping price(order over 100 free, else 10)
      state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
      //calculate tax price(15%)
      state.taxPrice = state.itemsPrice * 0.15;

      //calculate total price
      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
