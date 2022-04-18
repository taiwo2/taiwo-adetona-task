import React, { Component } from 'react'
import ProductOptions from '../component/ProductOptions'
import "../styles/productdetails.css"

import { gql } from "@apollo/client"

import { Query } from '@apollo/client/react/components'

import {store} from '../redux/store';
import { connect } from 'react-redux'

class ProductDetails extends Component {
  constructor(props){
    super(props)
    this.state ={
      productID: store.getState().user.productID,
      currency: store.getState().user.currency,
      imageIndex: 0
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState({productID: store.getState().user.productID, currency: store.getState().user.currency})
    })
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  handleImage = (index) =>{
    this.setState({imageIndex: index})
  }

  render() {
    const GET_DATA = gql`{
      product(id : ${JSON.stringify(this.state.productID)}){
        name
        description
        brand
        inStock
        gallery
        prices{
          amount
          currency{
            label
            symbol
          }
        }
        attributes{
          id
          name
          type
          items{
            displayValue
            id
            value
          }
        }
      }
    }`;

    return (
      <Query query={GET_DATA}>
        {({data, loading, error})=>{
            
          if (error) return <h1 style={{ textAlign: "center", margin: "10rem" }}>An Error Occured.</h1>

          if (loading) return <h1 style={{ textAlign: "center", margin: "10rem" }}>Loading...</h1>
              
            else {
              return (
                <div className="productdetailcover">
                  <div className="productImages">
                    <div>
                  {data.product.gallery.map((image, index)=>{
                      return (
                      <div className="imgdflex" key={image} >
                      <img 
                      src={image} key={image} 
                      width="130" alt="" 
                      height="100" 
                      onClick={()=>this.handleImage(index)}/>
                      </div>)
                    })}
                    </div>
                    <div className="imgdfle">
                    <img src={data.product.gallery[this.state.imageIndex]} alt={data.product.name} height="400" />
                    </div>
                  </div>
                  <div className="productInfo">

                    <h2 className="brand">{data.product.brand}</h2>
                    <h5 className="brandname">{data.product.name}</h5>
                    <ProductOptions data={data.product} />
                    <div className="htmltext">
                      <h3>From <b>{data.product.brand}</b></h3>
                      <div dangerouslySetInnerHTML={{__html: data.product.description}}></div>                    
                    </div>
                  </div>
                  
                </div>
              );
            }            
          }
        }
      </Query>
    )
  }
}

export default connect(null)(ProductDetails);