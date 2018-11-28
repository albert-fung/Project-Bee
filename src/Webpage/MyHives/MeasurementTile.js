import React, {Component} from "react";

export default class MeasurementTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const colorClass = this.props.selected && !this.props.disabled ? "measurement-tile--selected" : "";
    const disabledClass = this.props.disabled ? "measurement-tile--disabled" : "";
    const title = this.props.disabled ?
      "Select a hive and cluster with data" :
      this.props.label;

    return (<button
      className={`measurement-tile col-sm-3 col-md-3 col-lg-2 ${this.props.icon} ${colorClass} ${disabledClass}`}
      type="button"
      disabled={this.props.disabled}
      onClick={this.props.onClickMeasurement}
      title={title}>
      <h3>{this.props.label}</h3>
      <p className="measurement-tile--value">{this.props.value}</p>
    </button>)
  }
}