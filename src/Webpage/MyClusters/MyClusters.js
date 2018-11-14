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

  async componentDidMount() {
    if (auth.currentUser) {
      this.setState({loggedIn: true});
      const userId = auth.currentUser.uid;
      console.log("UserId", userId);
      if (userId) {
        const queryResult = await firestore.collection("cluster")
          .where("owners", "array-contains", userId)
          .get();
        const clusters = queryResult.docs.map(MyClusters.snapToCluster);
        this.setState({clusters});
      }
    } else {
      this.setState({loggedIn: false})
    }
  }



  render() {
    if (this.state.loggedIn) {
      return (
        <main>
          <div>
            {this.state.clusters.map(cluster => <ClusterManager key={cluster.id} cluster={cluster}/>)}
          </div>
          <button>Add Cluster</button>
        </main>
      );
    } else {
      return (<main>
        Please login to view your clusters
      </main>);
    }
  }
}


