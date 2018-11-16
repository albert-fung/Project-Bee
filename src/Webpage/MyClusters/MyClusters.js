import React from "react";
import ClusterManager from "./ClusterManager";
import "./MyClusters.css";
import SingleInputForm from "../../Shared/SingleInputForm";
import {firestore, auth} from "../../Firebase";

export default class MyClusters extends React.Component {
  constructor(props) {
    super(props);
    // this.addCluster = this.addCluster.bind(this);
  }

  static async addCluster(name) {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Must be logged in to create clusters");
    }
    const cluster = await firestore.collection("clusters").add({
      name,
      owners: [user.email],
      hives: []
    });
    await firestore.collection("measurements").doc(cluster.id).set({});
  }

  render() {
    return (
      <main>
        <div className="container">
          {this.props.clusters.map(cluster => <ClusterManager key={cluster.id} {...cluster}/>)}
        </div>
        <div className="row-center">
          <SingleInputForm label="+ Add a Cluster" onSubmit={MyClusters.addCluster}>
            <input type="text" maxLength="100" placeholder="Cluster Name"/>
          </SingleInputForm>
        </div>
        <hr/>
      </main>
    );
  }
}


