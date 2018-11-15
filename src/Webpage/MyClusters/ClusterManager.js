import React from "react";
import {firestore} from "../../Firebase";
import SingleInputForm from "../../Shared/SingleInputForm";


class HiveBadge extends React.Component {
  render() {
    return (
      <p className={this.props.public ? "public" : "private"}>
        {this.props.name}
      </p>);
  }
}


export default class ClusterManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {users: {}};
  }


  static renderHiveList(hives) {
    return Object.entries(hives)
      .map(([id, hive]) =>
        (<li key={id}><HiveBadge {...hive}/></li>));
  }


  formatOwner(ownerId) {
    if (this.state.users[ownerId]) {
      const user = this.state.users[ownerId];
      return `${user.name}(${user.email})`;
    } else {
      return "Loading...";
    }
  }

  componentDidMount() {
    this.props.owners.forEach(async ownerId => {
      const queryResult = await firestore.collection("users")
        .doc(ownerId)
        .get();
      const user = queryResult.data();
      this.setState({
        users: {
          [ownerId]: user,
          ...this.state.users
        }
      });
    });
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
              <li>
                Earth
              </li>
              <li>
                Sol
              </li>
              <li>
                Milky Way
              </li>
              <li>
                Cluster e289
              </li>
            </ul>
          </div>
          <div className="row col-sm-4">
            <h3 className="col-md-6 cluster-manager__subheading">Hives:</h3>
            <ul className="col-md-6">
              {ClusterManager.renderHiveList(this.props.hives)}
              <li>
                <SingleInputForm label="+ Add Hive">
                  <input type="text" placeholder="Hive Name" maxLength="100"/>
                </SingleInputForm>
              </li>
            </ul>
          </div>
          <div className="row col-sm-4">
            <h3 className="col-md-6 cluster-manager__subheading">Owners:</h3>
            <ul className="col-md-6">
              {this.props.owners.map(ownerId => (
                <li key={ownerId}>
                  {this.formatOwner(ownerId)}
                </li>))}
              <li>
                <SingleInputForm label="+ Add Owner">
                  <input type="email"/>
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