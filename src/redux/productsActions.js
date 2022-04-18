import * as types from './productTypes'

export const incrementQunatity = (id) => ({
  type: types.QUANTITY_INC, 
  payload: id
})
export const decrementQunatity = (id) => ({
  type: types.QUANTITY_DEC, 
  payload: id
})
export const removeItem = (id) => ({
  type: types.REMOVE_BAG_ITEM, 
  payload: id
})
export const updateCategory = (category) => ({
  type: types.CATEGORY_UPDATE, 
  payload: category
})
export const updateCurrency = (currency) => ({
  type: types.CURRENCY_UPDATE, 
  payload: currency
})
export const addtoCart = (Product) => ({
  type: types.ADD_TO_CART, 
  payload: Product
})
export const productId = (productID) => ({
  type: types.PRODUCT_ID, 
  payload: productID
})
export const emptyCart = () => ({
  type: types.CLEAR_CART, 
})

