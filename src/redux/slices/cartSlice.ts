import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getFromLocalStorage } from "@/helpers/getLocalStorage";

interface CartItem {
  id: number;
  product: string;
  price: number;
  cartQuantity: number;
}

const initialState = {
  cartItem: getFromLocalStorage("cartItems")
    ? JSON.parse(getFromLocalStorage("cartItems"))
    : ([] as CartItem[]),
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //  Add To Cart
    addToCart: (state, { payload }) => {
      const item = state.cartItem.find((x: { id: any }) => x.id === payload.id);
      const cartNotEmpty = state.cartItem.length > 0;
      if (cartNotEmpty) {
        return;
      } else {
        const product = {
          ...payload,
          cartQuantity: 1,
        };
        state.cartItem.push(product);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
      }
    },

    // Remove Item From Cart
    removeFromCart: (state, action) => {
      const product = state.cartItem.find(
        (x: { id: any }) => x.id === action.payload
      );
      state.cartItem = state.cartItem.filter(
        (cart: { id: any }) => cart.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
      toast.success(`${product?.product} Removed From Cart! `, {
        position: "top-right",
      });
    },
    // Get Total Quantity and Total Price Of Items In Cart
    getCartTotal: (state) => {
      let { total, quantity } = state.cartItem.reduce(
        (
          cartTotal: { total: number; quantity: any },
          cartItem: { price?: any; cartQuantity?: any }
        ) => {
          const { cartQuantity } = cartItem;
          const price: any = cartItem.price;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      total = parseFloat(total.toFixed(3));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart: (state) => {
      state.cartItem = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
  },
});

export const { addToCart, removeFromCart, getCartTotal, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
