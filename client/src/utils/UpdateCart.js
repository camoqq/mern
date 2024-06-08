import React from "react";

const UpdateCart = (state) => {
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

  return state;
};

export default UpdateCart;
