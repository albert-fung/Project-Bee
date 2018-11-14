import React from "react";
import ClusterManager from "./ClusterManager";
import {firestore, auth} from '../../Firebase';

export default class MyClusters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {clusters: []};
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
        }
      } else {
        this.setState({loggedIn: false})
      }
    });
  }



  render() {
    if (this.state.loggedIn) {
      return (
        <main>
          <div>
            {this.state.clusters.map(cluster => <ClusterManager key={cluster.id} {...cluster}/>)}
          </div>
          <button>Add Cluster</button>
        </main>
      );
    } else {
      return (<main>
        loading
      </main>);
    }
  }
}


