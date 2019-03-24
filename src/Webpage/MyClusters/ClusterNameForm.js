import React from "react";
import ReactForm from "../../Shared/ReactForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

export default class ClusterNameForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      name: props.initialName || ""
    };
  }

  handleCancel = () => {
    this.setState({
      name: this.props.initialName || ""
    });
    this.props.onRequestCancel();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.name);
  };

  render() {
    const {editing} = this.props;
    if (editing) {
      return <form className="cluster-name-form" onSubmit={this.handleSubmit}>
        <label>
          Cluster Name:
        <input name="name"
               value={this.state.name}
               onChange={this.handleInputChange}
               type="text"
               maxLength="100"/>
        </label>
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
          onClick={this.handleCancel}>
          <FontAwesomeIcon icon={faTimes}/>
        </button>
      </form>
    } else {
      return <h2>{this.props.initialName}</h2>
    }
  }
}