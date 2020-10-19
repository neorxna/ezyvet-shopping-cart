import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'

const DATA: ProductItemList = [
    {
        "name": "Sledgehammer",
        "price": 125.75
    },
    {
        "name": "Axe",
        "price": 190.50
    },
    {
        "name": "Bandsaw",
        "price": 562.13
    },
    {
        "name": "Chisel",
        "price": 12.9
    },
    {
        "name": "Hacksaw",
        "price": 18.45
    }
]

export type ProductItem = { name: String, price: number }
export type ProductItemList = Array<ProductItem>

const initialState: ProductItemList = []

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        populateProducts: (state: RootState, action: PayloadAction<ProductItemList | any>) =>
            [...action.payload]
    }
})

export const { populateProducts } = productsSlice.actions

export const populateAsync = (): AppThunk => dispatch => {
    setTimeout(() => {
        dispatch(populateProducts(DATA))
    }, 2000)
};

export const selectProducts = (state: RootState) => state.products

export const productsReducer = productsSlice.reducer
