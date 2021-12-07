import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Redirect, Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Checkout extends Component {
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ingred) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          {this.props.ingred && (
            <CheckoutSummary
              checkoutCancel={this.checkoutCancelHandler}
              checkoutContinue={this.checkoutContinueHandler}
              ingredients={this.props.ingred}
            />
          )}
          <Route path={this.props.match.path + "/contact-data"}>
            <ContactData
              price={this.props.totalPrice}
              ingredients={this.props.ingred}
            />
          </Route>
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ingred: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
