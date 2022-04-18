import React, { Component } from "react";
import { connect } from "react-redux";
import CartItems from "./CartItems";
import "../styles/minicart.css";
import { Link } from "react-router-dom";

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    const totalPrices = [];

    return (
      <div className="backdrop">
        <div className="minicart">
          <h3 style={{ textAlign: "left" }}>
            My Bags <span style={{fontSize: "18px",fontWeight: 500}}>
              {this.props.bagItems.length} {" "} items</span>
          </h3>

          <div className="items">
            {this.props.bagItems.map((item) => {
              const currentCurrencyPrice = item.prices.find(
                (currency) => currency.currency.label === this.props.currency
              );
              totalPrices.push(
                Math.ceil(item.quantity * currentCurrencyPrice.amount)
              );

              return (
                <CartItems
                  key={item.id}
                  price={currentCurrencyPrice}
                  data={item}
                />
              );
            })}
          </div>

          <div className="totalmini">
            <p>Total Price:</p> <p>{totalPrices.reduce((prev, nxt) => prev + nxt, 0)}{" "}
              {this.props.currency}
            </p>
          </div>

          <div className="showFullBag">
            <Link to="/cart">
              <button className="showcart">Show Full Cart</button>
            </Link>

            <button className="checkout">Checkout</button>
          </div>
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

export default connect(mapStateToProps)(MiniCart);
