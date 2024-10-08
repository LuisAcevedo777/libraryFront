import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import data from '../../../book.json'

export const productsAllSlice = createSlice({
    name: 'productsAll',
    initialState: [],
    reducers: {

        setProducts: (state, action) => {
            if(Array.isArray(action.payload)){
               return action.payload}
               else{
                state.push(action.payload)
            }

        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    try {
        dispatch(setProducts(data.libros)) 
        dispatch(setIsLoading(false))
    } catch (error) {
       throw (error) 
    }
       
       
}

export const filterProductThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(false))
    try{
     let uniqueProduct = data.libros?.find(libro=> libro.id == id)
       dispatch(setProducts([uniqueProduct]))
     dispatch(setIsLoading(false))}
     catch(error){throw error}
}


export const filterProductsTitleThunk = (title) => (dispatch) => {
    dispatch(setIsLoading(true));
        const newList = data.libros?.filter(libro=> libro.title?.toLowerCase().includes(title?.toLowerCase()))
          dispatch(setProducts(newList))
         dispatch(setIsLoading(false));
}

export const { setProducts } = productsAllSlice.actions;

export default productsAllSlice.reducer;
