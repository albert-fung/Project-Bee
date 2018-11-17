import React, {Component}from "react";
import "./MyHives.css";
import HiveSelector from "./HiveSelector";
import RecentMeasurements from "./RecentMeasurements";
import HiveGraph from "./HiveGraph";
import {firestore} from "../../Firebase";

export default class MyHives extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCluster: "",
      selectedHive: "",
      measurements: [],
      selectedMeasurement: ""
    };
    this.hiveSelected = this.hiveSelected.bind(this);
    this.measurementsUpdated = this.measurementsUpdated.bind(this);
  }

  measurementsUpdated(snapshot) {
    const measurements = snapshot.docs.map(snap => ({
      id: snap.id,
      ...snap.data()
    }));
    const times = measurements.map(measurement => MyHives.formatDate(measurement.date));
    this.setState({measurements, times})
  }

  hiveSelected(selectedCluster, selectedHive) {
    this.setState({selectedCluster, selectedHive});
    firestore.collection("measurements")
      .doc(selectedCluster)
      .collection("hives")
      .doc(selectedHive)
      .collection("measurements")
      .orderBy("date")
      .limit(31 * 24 * 4)
      .onSnapshot(this.measurementsUpdated);
  }

  static formatDate(firestoreDate) {
    const date = new Date(firestoreDate.seconds);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  render() {
    return (<main className="container">
      <HiveSelector onHiveChange={this.hiveSelected} clusters={this.props.clusters}/>
      <RecentMeasurements {...this.state.measurements[0]}
        selectedMeasurement={this.state.selectedMeasurement}
        onMeasurementChange={measurement => this.setState({selectedMeasurement: measurement})}/>
      <HiveGraph
        xAxisData={this.state.times}
        yAxisData={this.state.measurements.map(measurement =>
          measurement[this.state.selectedMeasurement])}/>
    </main>);
  }
}