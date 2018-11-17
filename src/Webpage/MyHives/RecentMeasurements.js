import React, {Component}from "react";
import MeasurementTile from "./MeasurementTile";


export default class RecentMeasurements extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="row">
      <MeasurementTile label="Temperature" icon="" value={this.props.temperature}/>
      <MeasurementTile label="Humidity" icon="" value={this.props.humidity}/>
      <MeasurementTile label="Air Quality" icon="" value={this.props.air_quality}/>
      <MeasurementTile label="Mass" icon="" value={this.props.mass}/>
      <MeasurementTile label="Bee Count" icon="" value={this.props.bees}/>
      <MeasurementTile label="Frequency" icon="" value={this.props.frequency}/>
    </div>);
  }
}