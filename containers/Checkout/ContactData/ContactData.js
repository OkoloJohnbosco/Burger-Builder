import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actionCreators from "../../../store/actions/index";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
        },
        valid: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zipcode",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
        },
        valid: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
            {
              value: "none",
              displayValue: "None",
            },
          ],
        },
        value: "none",
        valid: true,
        touched: false,
      },
    },
    submitable: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let id in this.state.orderForm) {
      formData[id] = this.state.orderForm[id].value;
    }
    const order = {
      ingredients: { ...this.props.ingredients },
      price: this.props.price,
      order: formData,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules?.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules?.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules?.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  isSubmitable = (id, toBeAdded) => {
    const submitable = Object.keys(this.state.orderForm)
      .filter((i) => i !== id)
      .map((i) => this.state.orderForm[i].valid)
      .concat(toBeAdded)
      .every((i) => i === true);
    console.log(submitable);
    this.setState({ submitable });
  };

  inputChangedHandler = (e, id) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElem = { ...updatedOrderForm[id] };
    updatedFormElem.value = e.target.value;

    updatedFormElem.valid = this.checkValidity(
      updatedFormElem.value,
      updatedFormElem.validation
    );
    updatedOrderForm[id] = updatedFormElem;
    updatedFormElem.touched = true;
    this.setState({ orderForm: updatedOrderForm });
    this.isSubmitable(id, updatedFormElem.valid);
  };

  render() {
    const formElementsArray = Object.keys(this.state.orderForm).map((item) => ({
      id: item,
      config: this.state.orderForm[item],
    }));
    let form = (
      <form onSubmit={this.orderHandler}>
        {/* <Input elementType=".." elementConfig=".." value=".." /> */}
        {formElementsArray.map((elem) => (
          <Input
            key={elem.id}
            elementType={elem.config.elementType}
            elementConfig={elem.config.elementConfig}
            value={elem.config.value}
            invalid={!elem.config.valid}
            touched={elem.config.touched}
            changed={(e) => this.inputChangedHandler(e, elem.id)}
          />
        ))}
        <Button
          type="submit"
          btnType="Success"
          disabled={!this.state.submitable}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.order.loading,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actionCreators.purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WithErrorHandler(ContactData, axios)));
