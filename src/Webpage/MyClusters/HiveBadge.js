import React from "react";
import ReactForm from "../../Shared/ReactForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

export default class HiveBadge extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: props.name || ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onRequestNameChange(this.props.id, this.state.name);
    this.setState({editing: false});
  };

  handleCancel = () => {
    this.setState({
      name: this.props.name || "",
      editing: false
    });
  };

  render() {
    const publicClass = this.props.public ? "hive--public" : "hive--private";
    const {id, onRequestDelete} = this.props;
    const {editing, name} = this.state;
    if (editing){
        return <form onSubmit={this.handleSubmit}>
          <label>Hive Name:
          <input name="name"
                 value={name}
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
      }
      return <li className={publicClass + " hive-badge"}>
        {this.props.name}
        <button type="button"
                className="btn"
                title="Edit hive name"
                onClick={() => this.setState({editing: true})}>
          <FontAwesomeIcon icon={faEdit}/>
        </button>
        <button type="button"
                className="btn"
                title="Delete Hive"
                onClick={() => onRequestDelete(id)}>
          <FontAwesomeIcon icon={faTrash}/>
        </button>
      </li>;
  }
}