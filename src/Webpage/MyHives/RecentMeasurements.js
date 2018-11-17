import React, {Component}from "react";
import MeasurementTile from "./MeasurementTile";


export default class RecentMeasurements extends Component {
  static fields = {
    temperature: {label: "Temperature", icon: ""},
    humidity: {label: "Humidity"},
    frequency: {label: "Frequency"},
    mass: {label: "Weight"},
    bees: {label: "Bee Count"},
    air_quality: {label: "Air Quality"},
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="row">
      {Object.entries(RecentMeasurements.fields).map(([field, options]) =>
        <MeasurementTile
          key={field}
          {...options}
          value={this.props[field]}
          selected={field === this.props.selectedMeasurement}
          onClickMeasurement={() => this.props.onMeasurementChange(field)}/>)}
    </div>;
  }
}