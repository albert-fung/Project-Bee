import React from "react";
import {firestore} from "../../Firebase";


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
        <h2>{this.props.name}</h2>
        <div className="row container-fluid">
          <div className="row col-sm-6">
            <h3 className="col-md-6 cluster-manager__heading">Hives:</h3>
            <ul className="col-md-6">
              {ClusterManager.renderHiveList(this.props.hives)}
              <li>
                <button className="btn">Add Hive</button>
              </li>
            </ul>
          </div>
          <div className="row col-sm-6">
            <h3 className="col-md-6 cluster-manager__heading">Owners:</h3>
            <ul className="col-md-6">
              {this.props.owners.map(ownerId => (
                <li key={ownerId}>
                  {this.formatOwner(ownerId)}
                </li>))}
              <li>
                <button className="btn">Add Owner</button>
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