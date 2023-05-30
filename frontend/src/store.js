import { configureStore } from '@reduxjs/toolkit'
import productSlice from './reducers/productSlice'
import productDetailsSlice from './reducers/productDetailsSlice'



export default configureStore({
  reducer: {

products:productSlice,
produc:productDetailsSlice,

devTools: process.env.NODE_ENV !== 'production',
// prod:productSlice.reducer

  }
})






