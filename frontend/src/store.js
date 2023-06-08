import { configureStore } from '@reduxjs/toolkit'
import productSlice from './reducers/productSlice'
import productDetailsSlice from './reducers/productDetailsSlice'
import userSlice from './reducers/userSlice'



export default configureStore({
  reducer: {

products:productSlice,
productDetails:productDetailsSlice,
user:userSlice,

devTools: process.env.NODE_ENV !== 'production',
// prod:productSlice.reducer

  }
})






