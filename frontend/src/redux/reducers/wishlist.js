import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishlist", (state, action) => {
      const item = action.payload;
      // Check if item already exists using optional chaining for safety
      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      let updatedWishlist;
      if (isItemExist) {
        // Item exists, don't add duplicate - just return current state
        updatedWishlist = [...state.wishlist];
      } else {
        // Add new item to wishlist
        updatedWishlist = [...state.wishlist, item];
      }
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
      return {
        ...state,
        wishlist: updatedWishlist,
      };
    })
    .addCase("removeFromWishlist", (state, action) => {
      const payloadId = typeof action.payload === 'string' ? action.payload : action.payload._id;
      const updatedWishlist = state.wishlist.filter((i) => i._id !== payloadId);
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
      return {
        ...state,
        wishlist: updatedWishlist,
      };
    });
});
