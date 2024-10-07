import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios'
import getConfig from './utils/getConfig';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {

                     setPurchases: (state,action)=>{

const purch = action.payload
return purch

                     }

    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
        .then((res) => dispatch(setPurchases(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
        
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
