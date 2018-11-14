import React from "react";


class HiveBadge extends React.Component {
  render() {
    return (
      <p className={this.props.public ? "public" : "private"} >
        {this.props.name}
      </p>);
  }
}



export default class ClusterManager extends React.Component {

  static renderHiveList(hives) {
    return Object.entries(hives)
      .map(([id, hive]) =>
        (<HiveBadge key={id} {...hive}/>));
  }

  render() {
    if (this.props) {
      return (<div>
        <h2>{this.props.name}</h2>
        <div>
          <h3>Hives:</h3>
          <ul>
            {ClusterManager.renderHiveList(this.props.hives)}
          </ul>
          <h3>Owners:</h3>
          <ul>

          </ul>
        </div>
      </div>);
    } else {
      return (<p>Error</p>)
    }
  }
}