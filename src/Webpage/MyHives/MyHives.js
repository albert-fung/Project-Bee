import React, {Component} from "react";
import "./MyHives.css";
import HiveSelector from "./HiveSelector";
import RecentMeasurements from "./RecentMeasurements";
import HiveGraph from "./HiveGraph";
import {firestore} from "../../Firebase";

const dateTimeOptions = {month: "numeric", day: "numeric" , hour: "numeric", minute: "2-digit"};
const DateFormatter = new Intl.DateTimeFormat("en-GB", dateTimeOptions);

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
    this.getRecentMeasurements = this.getRecentMeasurements.bind(this);
  }

  measurementsUpdated(snapshot) {
    const measurements = snapshot.docs.map(snap => ({
      id: snap.id,
      ...snap.data()
    })).reverse();
    const times = measurements.map(measurement => MyHives.formatDate(measurement.date));
    this.setState({measurements, times});
  }

  hiveSelected(selectedCluster, selectedHive) {
    this.setState({selectedCluster, selectedHive});
    firestore.collection("measurements")
      .doc(selectedCluster)
      .collection("hives")
      .doc(selectedHive)
      .collection("measurements")
      .orderBy("date", "desc")
      .limit(31 * 24 * 4)
      .onSnapshot(this.measurementsUpdated);
  }

  static formatDate(firestoreDate) {
    const date = new Date(firestoreDate.seconds * 1000);
    return DateFormatter.format(date);
  }

  getRecentMeasurements() {
    return this.state.measurements[this.state.measurements.length - 1];
  }

  render() {
    return (<main className="container">
      <HiveSelector onHiveChange={this.hiveSelected} clusters={this.props.clusters}/>
      <RecentMeasurements
        {...this.getRecentMeasurements()}
        selectedMeasurement={this.state.selectedMeasurement}
        disabled={!this.state.measurements.length}
        onMeasurementChange={measurement => this.setState({selectedMeasurement: measurement})}/>
      <HiveGraph
        name={this.state.selectedMeasurement}
        xAxisData={this.state.times}
        yAxisData={this.state.measurements.map(measurement =>
          measurement[this.state.selectedMeasurement])}/>
    </main>);
  }
}