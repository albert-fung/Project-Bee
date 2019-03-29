import React, {Component} from "react";


export default class HiveSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCluster: "",
      selectedHive: "",
      hivesList: []
    };
    this.selectCluster = this.selectCluster.bind(this);
    this.selectHive = this.selectHive.bind(this);
  }

  selectCluster(event) {
    const selectedCluster = event.target.value;
    const cluster = this.props.clusters.filter(cluster =>
      cluster.id === selectedCluster)[0];
    const hives = cluster ? cluster.hives : [];
    this.setState({
      selectedCluster,
      selectedHive: "",
      hivesList: hives
    });
  }

  selectHive(event) {
    const selectedHive = event.target.value;
    this.props.onHiveChange(this.state.selectedCluster, selectedHive);
    this.setState({selectedHive});
  }

  render() {
    return (<form className="hive-selector">
      <label>
        Cluster:
        <select name="selectedCluster"
                onChange={this.selectCluster}
                className="large-select cluster-select">
          <option className="blank-option" disabled selected value/>
          {this.props.clusters.map(cluster =>
            <option key={cluster.id} value={cluster.id}>{cluster.name}</option>)}
        </select>
      </label>

      <label>
        Hive:
        {this.state.selectedCluster
          ? <select name="selectedHive"
                    onChange={this.selectHive}
                    className="large-select hive-select">
            <option className="blank-option" selected value/>
            {this.state.hivesList.map(hive =>
              <option key={hive.id} value={hive.id}>{hive.name}</option>)}
          </select>
          : <span className="hive-select-placeholder">
            Select a cluster
          </span>}
      </label>
    </form>);
  }
}