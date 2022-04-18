import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import arrowdown from "../images/arrowdown.svg";
import cart from "../images/Vector.svg";
import { updateCategory,updateCurrency } from "../redux/productsActions";
import { connect } from "react-redux";
import { store } from "../redux/store";
import MiniBag from "./MiniCart";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: store.getState().user.currency,
      isCartOpen: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ currency: store.getState().user.currency });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCurrency = (e) => {
    localStorage.setItem("preferredCurrency", e.target.value);
    this.props.updateCurrency(e.target.value);
  };

  showMiniBag = () => {
    this.setState({
      isCartOpen: !this.state.isCartOpen,
    });

    if (window.location.pathname.split("/")[1] === "bag") {
      this.setState({
        isCartOpen: false,
      });
    }
  };

  render() {
    return (
      <nav className="navbar">
        <div className="homeflex">
        <Link to="/" style={{textDecoration: "none", color: "#5ECE7B"}}>
          <div
            className="category"
            onClick={() => this.props.updateCategory("tech")}
          >
            Home
          </div>
        </Link>

        <div className="categories">
          <span
            className="category"
            onClick={() => this.props.updateCategory("all")}
          >
            All
          </span>
          <span
            className="category"
            onClick={() => this.props.updateCategory("tech")}
          >
            Tech
          </span>
          <span
            className="category"
            onClick={() => this.props.updateCategory("clothes")}
          >
            Clothes
          </span>
        </div>
        </div>
        <div>
        <div
            className="arrowdown"
            onClick={() => this.props.updateCategory("clothes")}
          >
            <img src={arrowdown} alt="arrowdown" />
          </div>
        </div>
        <div className="currencycover">
          <select
            className="currency"
            value={this.state.currency}
            onChange={this.handleCurrency}
          >
            <option className="currencyOption" value="USD">
             $
            </option>
            <option className="currencyOption" value="GBP">
              £
            </option>
            <option className="currencyOption" value="AUD">
              A$
            </option>
            <option className="currencyOption" value="JPY">
               ￥
            </option>
            <option className="currencyOption" value="RUB">
              ₽
            </option>
          </select>

          <button
            onClick={this.showMiniBag}
            aria-label="show shopping bag button"
          >
            <img src={cart} alt="shopping cart icon" />
            <span className="badge">{this.props.bagItemsCount}</span>
          </button>
        </div>

        {this.state.isCartOpen && <MiniBag />}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bagItemsCount: state.user.bag.length,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateCategory: (category) => dispatch(updateCategory(category)),
  updateCurrency: (currency) => dispatch(updateCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
