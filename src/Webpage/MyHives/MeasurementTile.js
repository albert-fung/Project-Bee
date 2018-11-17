import React, {Component} from "react";

export default class MeasurementTile extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    const colorClass = this.props.selected ? "measurement-tile--selected" : "";
    return (<button className={`measurement-tile col-sm-3 col-md-2 ${this.props.icon} ${colorClass}`}>
      <h3>{this.props.label}</h3>
      <p className="measurement-tile--value">{this.props.value}</p>
    </button>)
  }
}