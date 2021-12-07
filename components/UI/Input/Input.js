import React from "react";
import classes from "./Input.module.css";

function Input(props) {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.touched && props.elementType !== "select") {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((i) => (
            <option key={i.value} value={i.value}>
              {i.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = null;
  }
  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
