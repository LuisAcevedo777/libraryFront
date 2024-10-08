import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cart.slice'
import  isLoadingSlice from './slices/isLoading.slice'
import  productsAllSlice  from './slices/productsAll.slice'


export default configureStore({
    reducer: {
            isLoading: isLoadingSlice,
            productsAll: productsAllSlice,
            cart: cartSlice
    }
})
