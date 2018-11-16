import React, {Component}from "react";
import "./MyHives.css";
import HiveSelector from "./HiveSelector";
import RecentMeasurements from "./RecentMeasurements";
import Graph from "./Graph";


export default class MyHives extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<main className="container">
      <HiveSelector clusters={this.props.clusters}/>
      <RecentMeasurements/>
      <Graph/>
    </main>);
  }
}