import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addtoCart} from '../redux/productsActions'
import "../styles/productoption.css"
import {store} from '../redux/store';

class ProductOptions extends Component {

    constructor(props){
        super(props)
        this.state = {
          currency: store.getState().user.currency,
            product: {
                attributes: {}
            },
            quantityError : null,
            addtoCart: "Choices To Add To Cart"
        }
    }

    createProductObject = () => {
      const product = {
        name: this.props.data.name,
        prices: this.props.data.prices,
        image: this.props.data.gallery[0],
        brand: this.props.data.brand,
        quantity: 1,
        id: Math.floor(Math.random()*1000),
        attributes: {}
        }

      this.props.data.attributes.forEach(attribute => {
        product.attributes[attribute.name] = ""
      });

      this.setState({
        product: product
      })
    }

    componentDidMount(){
        this.createProductObject()
        // console.log(this.props.data.attributes)
    }
 
    handleChoice = (attributeName, itemID) => {
        this.setState({
            product: {
                ...this.state.product,
                
                attributes: {
                    ...this.state.product.attributes,
                    [attributeName]: itemID

                }
            }
        })
    }

    handleBag = () => {
      this.props.addtoCart(this.state.product);
      this.setState({
        addToCart: "Added To Cart!"
      })

      this.createProductObject()


      setTimeout(()=>{
        this.setState({
          addToCart: "Select Choices To Add To Cart"
        })
      }, 3000)
      
    }

  render() {
    const currentCurrencyPrice = 
    this.props.data.prices.find(currency=> currency.currency.label === this.state.currency)

    if(!this.props.data.inStock){
      return(
        <h2 style={{color:"red", textAlign:"center"}}>
          OUT OF STOCK 
        </h2>
      )
    }
      
    return (
      <>
        {this.props.data.attributes.map((attribute) => {
          return (
            <div key={attribute.name} className="sizecoverbtn">
              {attribute.items.map((item) => {
                return (
                  <button 
                  className="sizebtn"
                  key={item.id} 
                  onClick={() => this.handleChoice(attribute.name, item.id )}
                   >
                    {attribute.type === "swatch" ? item.displayValue : item.value}
                  </button>
                );
              })}
            </div>
          );
        })}
        <div className='pricespace'>
          <h3>Price: <br />
          {currentCurrencyPrice.currency.symbol}{currentCurrencyPrice.amount}</h3> 
        </div>
        {!Object.values(this.state.product.attributes).some(choice=> choice === "") && !this.state.quantityError ?
            (<button onClick={this.handleBag} className="addcartbtn">ADD TO BAG</button>)
            :
            (<h6 style={{marginTop:"20px", textAlign:"center", height:"2em"}}>{this.state.addToCart}</h6> )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({ bagItems : state.user.bag })

const mapDispatchToProps = (dispatch) => ({ addtoCart: (product)=> dispatch(addtoCart(product))})

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptions)