import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    isSignup: true,
    submitable: false,
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
      },
    },
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthredirectPath();
    }
  }

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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9])/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  isSubmitable = (id, toBeAdded) => {
    const submitable = Object.keys(this.state.controls)
      .filter((i) => i !== id)
      .map((i) => this.state.controls[i].valid)
      .concat(toBeAdded)
      .every((i) => i === true);
    this.setState({ submitable });
  };

  inputChangedHandler = (e, id) => {
    const updatedOrderForm = {
      ...this.state.controls,
    };
    const updatedFormElem = { ...updatedOrderForm[id] };
    updatedFormElem.value = e.target.value;

    updatedFormElem.valid = this.checkValidity(
      updatedFormElem.value,
      updatedFormElem.validation
    );
    updatedOrderForm[id] = updatedFormElem;
    updatedFormElem.touched = true;
    this.setState({ controls: updatedOrderForm });
    this.isSubmitable(id, updatedFormElem.valid);
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({
      isSignup: !prevState.isSignup,
    }));
  };

  render() {
    const formElementsArray = Object.keys(this.state.controls).map((item) => ({
      id: item,
      config: this.state.controls[item],
    }));
    let form = formElementsArray.map((elem) => (
      <Input
        key={elem.id}
        elementType={elem.config.elementType}
        elementConfig={elem.config.elementConfig}
        value={elem.config.value}
        invalid={!elem.config.valid}
        touched={elem.config.touched}
        changed={(e) => this.inputChangedHandler(e, elem.id)}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    if (this.props.isAuthenticated) {
      form = <Redirect to={this.props.authRedirectPath} />;
    }
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form>
          {form}
          <Button type="submit" clicked={this.submitHandler} btnType="Success">
            {this.state.isSignup ? "SUBMIT" : "LOGIN"}
          </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burger.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapdispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
  onSetAuthredirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
});

export default connect(mapStateToProps, mapdispatchToProps)(Auth);
