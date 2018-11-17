import React, {Component}from "react";
import MeasurementTile from "./MeasurementTile";
import fields from "./fields.json";

export default class RecentMeasurements extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="row">
      {Object.entries(fields).map(([field, options]) =>
        <MeasurementTile
          key={field}
          {...options}
          value={this.props[field]}
          selected={field === this.props.selectedMeasurement}
          onClickMeasurement={() => this.props.onMeasurementChange(field)}/>)}
    </div>;
  }
}