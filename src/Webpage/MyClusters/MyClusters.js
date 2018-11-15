import React from "react";
import ClusterManager from "./ClusterManager";
import {firestore, auth} from '../../Firebase';
import "./MyClusters.css";

export default class MyClusters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {clusters: [], loggedIn: false, error: null};
  }

  static snapToCluster(snap) {
    return {id: snap.id, ...snap.data()};
  }

  componentDidMount() {
    auth.onAuthStateChanged(async user => {
      if (user) {
        this.setState({loggedIn: true});
        if (user.uid) {
          const queryResult = await firestore.collection("cluster")
            .where("owners", "array-contains", user.uid)
            .get();
          const clusters = queryResult.docs.map(MyClusters.snapToCluster);
          this.setState({clusters});
        } else {
          this.setState({error: "Not logged in"});
        }
      } else {
        this.setState({loggedIn: false})
      }
    });
  }



  render() {
    if (this.state.error) {
      return (<main>{this.state.error}</main>)
    } else if (!this.state.loggedIn) {
      return (<main>Loading...</main>)
    } else {
      return (
        <main>
          <div className="container">
            {this.state.clusters.map(cluster => <ClusterManager key={cluster.id} {...cluster}/>)}
          </div>
          <hr/>
          <div className="row-center">
            <button className="btn">+ Add Cluster</button>
          </div>
        </main>
      );
    }
  }
}


