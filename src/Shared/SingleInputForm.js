import React from 'react';
import ReactForm from "./ReactForm";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class SingleInputForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
    }

    this.setState({open: false, value: ""});
    return false;

  }

  renderInput() {
    return React.cloneElement(
      React.Children.only(this.props.children), {
        required: true,
        name: "value",
        value: this.state.value,
        onChange: this.handleInputChange
      });
  }

  render() {
    if (this.state.open) {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.renderInput()}
          <button
            type="submit"
            aria-label="Submit"
            className="btn">
            <FontAwesomeIcon icon={faCheck}/>
          </button>
          <button
            type="reset"
            className="btn"
            aria-label="Cancel"
            onClick={() => this.setState({open: false, value: ""})}>
            <FontAwesomeIcon icon={faTimes}/>
          </button>
        </form>
      );
    }
    else {
      return (
        <button className={'btn ' + this.props.buttonClass}
                onClick={() => this.setState({open: true})}>
          {this.props.label}
        </button>
      );
    }
  }
}