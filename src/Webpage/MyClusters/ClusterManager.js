import React from "react";

export default class ClusterManager extends React.Component {
  render() {
    return (<div>
      {JSON.stringify(this.props.cluster)}
    </div>);
  }
}