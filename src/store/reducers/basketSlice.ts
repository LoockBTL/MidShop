import { ProductBasketInterface } from './../../types/product-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BasketInterface {
  products: ProductBasketInterface[]
}

const initialState: BasketInterface = {
  products: [],
}
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductBasketInterface>) => {
      if (!state.products.find((obj) => obj.id === action.payload.id)) {
        state.products.push(action.payload)
      }
    },
    incrementProduct: (state, action: PayloadAction<string>) => {
      let product = state.products.find((obj) => obj.id === action.payload)
      if (product !== undefined) {
        product.count++
        state = { ...state, products: [...state.products, product] }
      }
    },
    decrementProduct: (state, action: PayloadAction<string>) => {
      let product = state.products.find((obj) => obj.id === action.payload)
      if (product !== undefined) {
        product.count = product.count > 1 ? product.count - 1 : 1
        state = { ...state, products: [...state.products, product] }
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((obj) => obj.id !== action.payload)
    },
    clearBusket: (state) => {
      state.products = []
    },
  },
})

export const { reducer: basketReducer, actions: basketActions } = basketSlice
