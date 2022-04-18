import * as types from './productTypes'
const currentID = window.location.pathname.split('/')[2]
const preferredCurrency = localStorage.getItem('preferredCurrency')
const initialState = {
    category: "all",
    productID: currentID,
    currency: preferredCurrency || "USD",
    bag: JSON.parse(localStorage.getItem("bag")) || []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CATEGORY_UPDATE:
      return {
        ...state,
        category: action.payload
      }  
    case types.CURRENCY_UPDATE:
      return {
        ...state,
        currency: action.payload
      }
    case types.PRODUCT_ID:
      return {
        ...state,
        productID: action.payload
      }
    case types.ADD_TO_CART:
      localStorage.setItem("bag", JSON.stringify([...state.bag, action.payload]))
      return {
        ...state,
        bag: [...state.bag, action.payload]
      }
    case types.CLEAR_CART:
      return {
        ...state,
        bag: []
      }
    case types.REMOVE_BAG_ITEM:
      const newfag = state.bag.filter(bagItem => bagItem.id !== action.payload)
      localStorage.setItem("bag", JSON.stringify(newfag))
      return {
        ...state,
        bag: newfag
      }
    case types.QUANTITY_INC: 
      const newBag = state.bag.map(item=>{
        if(item.id===action.payload){
                return{
                    ...item,
                    quantity: Number(item.quantity)+1
                } 
        } else return item
      })  
  
      localStorage.setItem("bag", JSON.stringify(newBag))

      return {
      ...state,
      bag: newBag
      }
    case types.QUANTITY_DEC:
      const newbag = state.bag.map(item=>{
        if(item.id===action.payload){
            if(item.quantity > 0){
                return{
                    ...item,
                    quantity: Number(item.quantity)-1
                } 
            } else return item
            

        } else return item
    })
        localStorage.setItem("bag", JSON.stringify(newbag))


      return {
          ...state,
          bag: newbag
      }
    default:
      return state
  }

}

export default rootReducer