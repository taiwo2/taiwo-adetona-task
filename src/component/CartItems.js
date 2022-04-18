import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "../redux/store";
import  "../styles/cartitems.css";
import deleteIcon from "../images/delete.svg";
import { incrementQunatity,decrementQunatity,removeItem } from "../redux/productsActions";
class CartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.data.quantity,
    };
    
  }

  
  componentDidMount() {
    console.log(this.props.data.attributes)
    this.unsub = store.subscribe(() => {
      const x = this.props.data.id;
      const item = store.getState().user.bag.find((item) => {
        return item.id === x;
      });

      this.setState({
        quantity: item.id ? item.quantity : 0,
      });
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  increment = () => {
    this.props.incrementQunatity(this.props.data.id);
  };

  decrement = () => {
    this.props.decrementQunatity(this.props.data.id);
  };

  removeItem = () => {
    this.props.removeItem(this.props.data.id);
  };

  render() {
    return (
      <div className="productcover">
        <div className="productDetails">
          <div>
            <h2>{this.props.data.brand}</h2>
            <h3>{this.props.data.name}</h3>
            {this.props.price.currency && (
              <h4>
                {this.props.price.amount}
                {this.props.price.currency.symbol}
              </h4>
            )}
          </div>

          {Object.entries(this.props.data.attributes).map((attribute) => {
            return (
              <div key={attribute}>
                <button className="symbolbtn">{attribute[0][0]}</button>
              <button className="symbolbtn onhover">
                {
                attribute[0] === "Size" ? attribute[1] : attribute[1].slice(0,2)}
              </button>
              </div>
            );
          })}
        </div>

        <div className="productShowCase">
          <div className="productQuantity">
            <button onClick={this.increment}>+</button>
            <b>{this.state.quantity}</b>
            <button onClick={this.decrement}>-</button>
          </div>

          <img
            src={this.props.data.image}
            width="150"
            height="auto"
            alt="product"
          />
          <button onClick={this.removeItem} className="removebtn">
            <img
              src={deleteIcon}
              width="32"
              height="auto"
              alt="trash"
            />
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  incrementQunatity: (id) => dispatch(incrementQunatity(id)),
  decrementQunatity: (id) => dispatch(decrementQunatity(id)),
  removeItem: (id) => dispatch(removeItem(id)),
});

export default connect(null, mapDispatchToProps)(CartItems);
