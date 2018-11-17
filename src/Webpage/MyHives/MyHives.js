import React, {Component}from "react";
import "./MyHives.css";
import HiveSelector from "./HiveSelector";
import RecentMeasurements from "./RecentMeasurements";
import Graph from "./Graph";
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
    this.setState({measurements})
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

  render() {
    return (<main className="container">
      <HiveSelector onHiveChange={this.hiveSelected} clusters={this.props.clusters}/>
      <RecentMeasurements {...this.state.measurements[0]}
        selectedMeasurement={this.state.selectedMeasurement}
        onMeasurementChange={measurement => this.setState({selectedMeasurement: measurement})}/>
      <Graph/>
    </main>);
  }
}