import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/product.css'
import { connect } from 'react-redux'
import { store } from '../redux/store'
import { productId } from '../redux/productsActions'

class Product extends Component {
  constructor(props){
    super(props)
    this.state = {
      currency: store.getState().user.currency,
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState({
        currency: store.getState().user.currency,
      })
    })
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  render() {
    const currentCurrencyPrice = this.props.data.prices.find(currency=> currency.currency.label === this.state.currency)
    return (
      <div className="container">

        <Link to={`/product/${this.props.data.id}`}>
          <img
            src={this.props.data.gallery[0]}
            height="300"
            width="auto"
            alt={this.props.data.name}
            className={this.props.data.inStock ? "productImg" : "productopac"}
            onClick={()=>this.props.updateProductID(this.props.data.id)}
          />
        </Link>

        <div className="details">
          {this.props.data.inStock && (
            <>
             <div className="details-h4">{this.props.data.name}</div>
              <div className="details-h5">
                {currentCurrencyPrice.currency.symbol}
                {currentCurrencyPrice.amount}
              </div>
            </>
          )}
        </div>
        {!this.props.data.inStock && (
          <>
            <div className="outstock">
              <h4>{this.props.data.name}</h4>
              <h5>
                {currentCurrencyPrice.currency.symbol}
                {currentCurrencyPrice.amount}
              </h5>
            </div>
            <h2 className="stock"> OUT OF STOCK </h2>
          </>
            )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateProductID: (product)=> dispatch(productId(product)),
})

export default connect(null, mapDispatchToProps)(Product)