import React, { Component } from 'react'
import "../styles/homepage.css"
import Product from '../component/Product'

import { graphql } from '@apollo/client/react/hoc';
import { gql } from "@apollo/client"

import {store} from "../redux/store"

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      category: store.getState().user.category,
      currency: store.getState().user.currency
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState({category: store.getState().user.category, currency: store.getState().user.currency})
    })
  }

  componentWillUnmount(){
    this.unsubscribe()
  }
  
  showProducts() {
    if(!this.props.data.loading){
      const categories = this.props.data.categories;
      const {products} = categories.find(category => category.name === this.state.category)

      return(
        products.map(product=>{
          const currentCurrencyPrice = product.prices.find(currency=> currency.currency.label === this.state.currency)

          return <Product data={product} price={currentCurrencyPrice} key={product.id}/>
        })
      )
      
    } else return <h1>Loading...</h1>
  }

  render() {
    return (
      <div className="homecover">
        {this.props.data.categories && (
          <>
            <h1>{this.state.category.toUpperCase()}</h1>

            <div className="productslist">{this.showProducts()}</div>
          </>
        )}
      </div>
    );
  }
}

const GET_DATA = gql`{
  categories{
    name
    products{
      id
      name
      brand
      inStock
      gallery
      prices{
        amount
        currency{
          symbol
          label
        }
      }
      attributes{
        type
        name
        items{
          value
          displayValue
          id
        }
      }
    }
  }
}`

export default graphql(GET_DATA)(Home);