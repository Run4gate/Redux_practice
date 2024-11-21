import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], cartIsVisible: false, totalQuantity: 0 },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.cart.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price
        });
      } else {
        existingItem.quantity++
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      }
      state.totalQuantity++
    },
    removeFromCart(state, action) {
        const id = action.payload
        const existingItem = state.cart.find(item => item.id === id)
        if (existingItem.quantity === 1) {
            state.cart = state.cart.filter(item => item.id !== id)
        } else {
            existingItem.quantity--
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price
        }
        state.totalQuantity--
    },
    showCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    setCart(state, action) {
      console.log(action)
      state.cart = action.payload.cart
      state.totalQuantity = action.payload.totalQuantity
    }
  },
});

export const cartActions = cartSlice.actions
export default cartSlice