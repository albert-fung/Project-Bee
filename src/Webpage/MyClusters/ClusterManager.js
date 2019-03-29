import React from "react";
import {firestore, fireFieldValue} from "../../Firebase";
import SingleInputForm from "../../Shared/SingleInputForm";
import LocationForm from "./LocationForm";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ClusterNameForm from "./ClusterNameForm";
import HiveBadge from "./HiveBadge";


export default class ClusterManager extends React.Component {

  constructor(props) {
    super(props);
    this.addHive = this.addHive.bind(this);
    this.addOwner = this.addOwner.bind(this);
    this.deleteHive = this.deleteHive.bind(this);
    this.deleteOwner = this.deleteOwner.bind(this);
    this.deleteCluster = this.deleteCluster.bind(this);
    this.saveClusterName = this.saveClusterName.bind(this);
    this.editClusterName = this.editClusterName.bind(this);
    this.saveHiveName = this.saveHiveName.bind(this);
    this.state = {
      editingClusterName: false
    };
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

  async saveHiveName(editedHiveId, newHiveName) {
    if (!this.props.id) {
      throw new Error("Cluster missing an ID");
    }
    try{
      const hives = this.props.hives.reduce((hiveMap, hiveRow) => {
        const {id, ...hive} = hiveRow;

        if (id !== editedHiveId) {
          hiveMap[id] = hive;
        } else {
          hiveMap[id] = {...hive, name: newHiveName};
        }
        return hiveMap;
      }, {});

      await firestore.collection("clusters")
        .doc(this.props.id)
        .update({hives});
    } catch (error) {
      console.error("Cannot edit hive", error);
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

  async saveClusterName(clusterName) {
    if (!this.props.id) {
      throw new Error("Cluster missing an ID");
    }
    try {
      await firestore.collection("clusters")
        .doc(this.props.id).update({name: clusterName});
    } catch (error) {
      console.error("Cannot edit cluster", error);
    } finally {
      this.setState({editingClusterName: false});
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

  editClusterName() {
    this.setState({editingClusterName: true});
  }

  render() {

    if (this.props) {
      return <div className="cluster-manager">
        <div className="cluster-manager__head">
          <ClusterNameForm initialName={this.props.name}
                           editing={this.state.editingClusterName}
                           onSubmit={this.saveClusterName}
                           onRequestCancel={() => this.setState({editingClusterName: false})}/>
          <div>
            <button type="button"
                    onClick={this.editClusterName}
                    aria-label="Edit Cluster Name"
                    className="btn">
              <FontAwesomeIcon icon={faEdit}/>
            </button>

            <button type="button"
                    className="btn"
                    aria-label="Delete Cluster"
                    onClick={this.deleteCluster}>
              <FontAwesomeIcon icon={faTrash}/>
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
                  onRequestNameChange={this.saveHiveName}
                  onRequestDelete={this.deleteHive}/>)}
              <li>
                <SingleInputForm
                  buttonClass="btn--dark"
                  label="+ Add Hive"
                  onSubmit={this.addHive}>

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
                    <FontAwesomeIcon icon={faTrash}/>
                  </button>
                </li>))}
              <li>
                <SingleInputForm
                  buttonClass="btn--dark"
                  label="+ Add Owner"
                  onSubmit={this.addOwner}>
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