import { configureStore } from '@reduxjs/toolkit'
import { productsReducer } from '../features/products/productsSlice'
import { cartReducer } from '../features/cart/cartSlice'
import { ThunkAction } from 'redux-thunk'
import { Action, Store, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}
const reducers = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store: Store = configureStore({
  reducer: persistedReducer
})

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  any,
  Action<string>
  >
export type AppDispatch = typeof store.dispatch
