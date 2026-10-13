import { createSlice } from '@reduxjs/toolkit';

// state.items = [{ name, image, cost, quantity }]
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // payload: { name, image, cost }  (cost is a number, e.g. 15)
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    // payload: name (string)
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    // payload: { name, quantity }
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
