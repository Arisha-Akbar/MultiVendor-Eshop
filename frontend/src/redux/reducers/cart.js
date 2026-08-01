import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],

};

export const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("addToCart", (state, action) => {
            const item = action.payload;
            const isItemExist = state.cart.find((i) => i._id === item._id);
            let updatedCart;
            if (isItemExist) {
                updatedCart = state.cart.map((i) => (i._id === isItemExist._id ? item : i));
            } else {
                updatedCart = [...state.cart, item];
            }
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            return {
                ...state,
                cart: updatedCart,
            };
        })
        .addCase("removeFromCart", (state, action) => {
            const updatedCart = state.cart.filter((i) => i._id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            return {
                ...state,
                cart: updatedCart,
            };
        });
});
