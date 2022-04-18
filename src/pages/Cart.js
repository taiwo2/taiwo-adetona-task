import React, { Component } from "react";
import { connect } from "react-redux";
import CartItems from "../component/CartItems";
import { emptyCart } from "../redux/productsActions";
import  "../styles/cart.css"

class Cart extends Component {
  clearCart = () => {
    this.props.clearCartItems();
  };

  render() {
    const totalPrices = [];

    return (
      <div style={{ padding: "10px 10%" }}>
        <button onClick={this.clearCart} className="clearbtn">
          Clear Cart
        </button>
        <div>
          {this.props.bagItems.map((item) => {
            const currentCurrencyPrice = item.prices.find(
              (currency) => currency.currency.label === this.props.currency
            );

            totalPrices.push(
              Math.ceil(item.quantity * currentCurrencyPrice.amount)
            );

            return (
              <CartItems key={item.id} price={currentCurrencyPrice} data={item} />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bagItems: state.user.bag,
    currency: state.user.currency,
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearCartItems: () => dispatch(emptyCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
