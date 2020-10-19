import { createSlice, Action, PayloadAction, Slice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';


//export type CartLine = { name: string, quantity: number }
export type CartLines = { [key: string]: number }

const initialCartState: CartLines = {}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        updateQuantity: (state: RootState, action: PayloadAction<{ name: string, quantity: number } | any>) => {
            const { name, quantity } = action.payload
            const itemExists = state[name] !== undefined
            if (itemExists) {
                // if new quantity is zero, remove line
                if (state[name] && state[name] + quantity === 0) {
                    delete state[name]
                } else {
                    state[name] += quantity
                }
            } else {
                state[name] = quantity
            }
        }
    }
})

export const selectCartItems = (state: RootState) => state.cartItems
export const cartReducer = cartSlice.reducer
export const { updateQuantity } = cartSlice.actions