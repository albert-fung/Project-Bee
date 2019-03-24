import React from "react";
import {firestore, fireFieldValue} from "../../Firebase";
import SingleInputForm from "../../Shared/SingleInputForm";
import LocationForm from "./LocationForm";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class HiveBadge extends React.Component {
  render() {
    const publicClass = this.props.public ? "hive--public" : "hive--private";
    const {id, onRequestDelete} = this.props;
    return (
      <li className={publicClass + " hive-badge"}>
        {this.props.name}
        <button type="button"
                className="btn"
                title="Delete Hive"
                onClick={() => onRequestDelete(id)}>
          &times;
        </button>
      </li>
    );
  }
}

export default class ClusterManager extends React.Component {

  constructor(props) {
    super(props);
    this.addHive = this.addHive.bind(this);
    this.addOwner = this.addOwner.bind(this);
    this.deleteHive = this.deleteHive.bind(this);
    this.deleteOwner = this.deleteOwner.bind(this);
    this.deleteCluster = this.deleteCluster.bind(this);
    this.editCluster = this.editCluster.bind(this);
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

  async deleteHive(hiveId) {
    if (!this.props.id) {
      throw new Error("Cluster missing an ID");
    }
    try {
      const newHives = this.props.hives.filter(({id}) => id !== hiveId);
      await firestore.collection("clusters")
        .doc(this.props.id)
        .update({hives: newHives});
    } catch (error) {
      console.error("Error removing hive", error)
    }
  }

  static async userExists(email) {
    const user = await firestore.collection("users")
      .doc(email)
      .get();
    return user.exists;
  }

  async deleteCluster() {
    if (!this.props.id) {
      throw new Error("Cluster missing an ID");
    }
    try {
      console.log(this.props.id);
      await firestore.collection("clusters")
        .doc(this.props.id).delete();
    } catch (error) {
      console.error("Cannot delete cluster", error);
    }
  }

  async editCluster(clusterName) {
    if (!this.props.id) {
      throw new Error("Cluster missing an ID");
    }
    try {
      await firestore.collection("clusters")
        .doc(this.props.id).update({name: clusterName});
    } catch (error) {
      console.error("Cannot edit cluster", error);
    }
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

  async deleteOwner(ownerEmail) {
    if (!this.props.id) {
      throw new Error("Cluster missing an ID");
    }
    try {
      const newOwners = this.props.owners.filter(email => email !== ownerEmail);
      await firestore.collection("clusters")
        .doc(this.props.id)
        .update({owners: newOwners});
    } catch (error) {
      console.error("Cannot delete owner", error);
    }

  }

  render() {
    if (this.props) {
      return <div className="cluster-manager">
        <div className="cluster-manager__head">
          <h2>{this.props.name}</h2>

          <div>
            <button type="button"
                    className="btn">
              <FontAwesomeIcon icon={faEdit}/>
            </button>

            <button type="button"
                    className="btn"
                    aria-label="Delete Cluster"
                    onClick={this.deleteCluster}>
              &times;
            </button>
          </div>
        </div>

        <div className="cluster-manager__body">
          <div>
            <h3 className="cluster-manager__subheading">
              Location
            </h3>
            <LocationForm
              clusterId={this.props.id}
              initialLocation={this.props.location}/>
          </div>
          <div>
            <h3 className="cluster-manager__subheading">
              Hives
            </h3>
            <ul className="cluster-manager__body__list">
              {this.props.hives.map(hive =>
                <HiveBadge
                  key={hive.id} {...hive}
                  onRequestDelete={this.deleteHive}/>)}
              <li>
                <SingleInputForm label="+ Add Hive" onSubmit={this.addHive}>
                  <input type="text" placeholder="Hive Name" maxLength="100" autoComplete="off"/>
                </SingleInputForm>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="cluster-manager__subheading">
              Owners
            </h3>
            <ul className="cluster-manager__body__list">
              {this.props.owners.map(owner => (
                <li className="cluster-owner-item"
                    key={owner}>
                  {owner}
                  <button
                    type="button"
                    className="btn"
                    aria-label="Delete Owner"
                    onClick={() => this.deleteOwner(owner)}>
                    &times;
                  </button>
                </li>))}
              <li>
                <SingleInputForm label="+ Add Owner" onSubmit={this.addOwner}>
                  <input type="email" autoComplete="email"/>
                </SingleInputForm>
              </li>
            </ul>
          </div>
        </div>
      </div>;
    } else {
      return (<p>Error</p>)
    }
  }
}