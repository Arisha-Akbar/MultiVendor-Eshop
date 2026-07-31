// add to cart
export const addTocart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });

  // Save entire cart state to localStorage
  const state = getState();
  localStorage.setItem("cartItems", JSON.stringify(state.cart.cart));
  return data;
};

// remove from cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: id,
  });
  // localStorage is updated in reducer
  return id;
};
