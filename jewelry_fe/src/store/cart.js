import { create } from "zustand";
import variables from "../constants/variables";

const increaseCartProduct = (cart, product, quantity) => {
  const newCart = [...cart];

  const productIndex = newCart.findIndex((productInCart) => productInCart.id === product.id)

  if (productIndex !== -1) {
    newCart[productIndex] = {
      ...newCart[productIndex],
      quantity: newCart[productIndex].quantity + quantity
    }

    localStorage.setItem(variables.CART, JSON.stringify(newCart))
    return newCart
  }

  const saveCart = [
    {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      quantity: quantity
    },
    ...newCart,
  ]

  localStorage.setItem(variables.CART, JSON.stringify(saveCart))
  return saveCart
}

const decreaseCartProduct = (cart, product) => {
  const newCart = [...cart];
  const findIndex = newCart.findIndex(
    cartProduct => cartProduct.id === product.id
  );
  if (newCart[findIndex].quantity === 1) {
    newCart.splice(findIndex, 1);
    localStorage.setItem(variables.CART, JSON.stringify(newCart))
    return newCart;
  }

  newCart[findIndex] = {
    ...newCart[findIndex],
    quantity: newCart[findIndex].quantity - 1,
  };

  localStorage.setItem(variables.CART, JSON.stringify(newCart))
  return newCart;
}

const removeCartProduct = (cart, product) => {
  const newCart = cart.filter(productInCart => Number(productInCart.id) !== Number(product.id))

  localStorage.setItem(variables.CART, JSON.stringify(newCart))
  return newCart
}

const clearCart = () => {
  localStorage.setItem(variables.CART, '[]')

  return []
}

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem(variables.CART) || '[]'),

  increaseCartProduct: (product, quantity) => set(state =>
    ({ cart: increaseCartProduct(state.cart, product, quantity) })),

  decreaseCartProduct: (product) => set(state =>
    ({ cart: decreaseCartProduct(state.cart, product) })),

  removeCartProduct: (product) => set((state) =>
    ({ cart: removeCartProduct(state.cart, product) })),

  clearCart: () => set(() => ({ cart: clearCart() })),

  totalPrice: state => state.cart.reduce((total, product) => {
    return total + (Number(product.price) * Number(product.quantity))
  }, 0)
}))