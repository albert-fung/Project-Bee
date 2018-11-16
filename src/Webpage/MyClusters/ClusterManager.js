import React from "react";
import {firestore, fireFieldValue} from "../../Firebase";
import SingleInputForm from "../../Shared/SingleInputForm";


class HiveBadge extends React.Component {
  render() {
    const publicClass = this.props.public ? "hive--public" : "hive--private";
    return (
      <p className={publicClass + " hive-badge"}>
        {this.props.name}
      </p>);
  }
}


export default class ClusterManager extends React.Component {

  constructor(props) {
    super(props);
    this.addHive = this.addHive.bind(this);
    this.addOwner = this.addOwner.bind(this);
  }

  static renderHiveList(hives) {
    return Object.entries(hives)
      .map(([id, hive]) =>
        (<li key={id}><HiveBadge {...hive}/></li>));
  }

  async addHive(name) {
    if (!this.props.id) {
      throw new Error("Cluster missing an ID");
    }
    const hiveSnapshot = await firestore.collection("measurements")
      .doc(this.props.id)
      .collection("hives")
      .add({});
    const path = `hives.${hiveSnapshot.id}`;
    await firestore.collection("clusters")
      .doc(this.props.id)
      .update({[path]: {name, public: true}});
  }

  static async userExists(email) {
    const user = await firestore.collection("users")
      .doc(email)
      .get();
    return user.exists;
  }

  async addOwner(email) {
    // Ensure owner for given email exists
    if (!ClusterManager.userExists(email)) {
      throw new Error("No owner with that email address");
    } else {
      // Add them to the list
      await firestore.collection("clusters")
        .doc(this.props.id)
        .update({owners: fireFieldValue.arrayUnion(email)});
    }
  }

  render() {
    if (this.props) {
      return (<div className="container-fluid cluster-manager">
        <div className="row">
          <h2 className="col-xs-8 cluster-manager__heading">
            {this.props.name}
          </h2>
          <div className="col-xs-4 cluster-manager__heading cluster-manager__heading-buttons">
            <button className="pull-right icon-button" aria-label="Show on map">
              <i className="fas fa-map-marked"/>
            </button>
          </div>
        </div>
        <div className="row container-fluid">

          <div className="row col-sm-4">
            <h3 className="col-md-6 cluster-manager__subheading">Location:</h3>
            <ul className="col-md-6">
              <li>
                Ottawa
              </li>
              <li>
                Ontario
              </li>
              <li>
                Canada
              </li>
              <li>
                North America
              </li>
            </ul>
          </div>
          <div className="row col-sm-4">
            <h3 className="col-md-6 cluster-manager__subheading">Hives:</h3>
            <ul className="col-md-6">
              {ClusterManager.renderHiveList(this.props.hives)}
              <li>
                <SingleInputForm label="+ Add Hive" onSubmit={this.addHive}>
                  <input type="text" placeholder="Hive Name" maxLength="100" autoComplete="off"/>
                </SingleInputForm>
              </li>
            </ul>
          </div>

          <div className="row col-sm-4">
            <h3 className="col-md-6 cluster-manager__subheading">Owners:</h3>
            <ul className="col-md-6">
              {this.props.owners.map(owner => (
                <li key={owner}>
                  {owner}
                </li>))}
              <li>
                <SingleInputForm label="+ Add Owner" onSubmit={this.addOwner}>
                  <input type="email" autoComplete="email"/>
                </SingleInputForm>
              </li>
            </ul>
          </div>
        </div>
      </div>);
    } else {
      return (<p>Error</p>)
    }
  }
}