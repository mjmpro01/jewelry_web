import { create } from "zustand";
import variables from "../constants/variables";

const setIsOpenCartDrawer = (isOpen) => {
  localStorage.setItem(variables.IS_OPEN_CART_DRAWER, isOpen);
  return isOpen
}

export const useCartDrawerStore = create((set) => ({
  isOpenCartDrawer: localStorage.getItem(variables.IS_OPEN_CART_DRAWER) === "true",

  setIsOpenCartDrawer: (isOpen) => set(() => ({ isOpenCartDrawer: setIsOpenCartDrawer(isOpen) })),

  openCartDrawer: () => set(() => {
    localStorage.setItem(variables.IS_OPEN_CART_DRAWER, true);
    return { isOpenCartDrawer: true }
  }),

  closeCartDrawer: () => set(() => {
    localStorage.setItem(variables.IS_OPEN_CART_DRAWER, false);
    return { isOpenCartDrawer: false }
  }),
}))