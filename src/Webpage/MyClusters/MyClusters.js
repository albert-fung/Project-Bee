import React from "react";
import ClusterManager from "./ClusterManager";
import "./MyClusters.css";

export default class MyClusters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <div className="container">
          {this.props.clusters.map(cluster => <ClusterManager key={cluster.id} {...cluster}/>)}
        </div>
        <hr/>
        <div className="row-center">
          <button className="btn">+ Add Cluster</button>
        </div>
      </main>
    );
  }
}


