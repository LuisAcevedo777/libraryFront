import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import data from '../../../book.json'

export const productsAllSlice = createSlice({
    name: 'productsAll',
    initialState: [],
    reducers: {

        setProducts: (state, action) => {
            const productsAll = action.payload
            return productsAll

        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))
       dispatch(setProducts(data.libros))
        dispatch(setIsLoading(false))
}

export const filterProductThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));  
     const uniqueProduct = data.libros?.find(libro=> libro.id == id)
     console.log(uniqueProduct)
         dispatch(setProducts(uniqueProduct))
     dispatch(setIsLoading(false))
}


export const filterProductsTitleThunk = (title) => (dispatch) => {
    dispatch(setIsLoading(true));
        const newList = data.libros?.filter(libro=> libro.name.includes(title))
         dispatch(setProducts(newList))
         dispatch(setIsLoading(false));
}

export const { setProducts } = productsAllSlice.actions;

export default productsAllSlice.reducer;
