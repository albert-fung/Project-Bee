import React from 'react';
import ReactForm from "../Shared/ReactForm";

export default class ClusterHiveForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      clusterId: undefined,
      hiveId: undefined
    }
  }

  render() {
    return (
      <form className="row-center" onSubmit={event => {
        this.props.onSubmit(this.state.clusterId, this.state.hiveId);
        event.preventDefault();
      }}>
        <input type="text" placeholder="Cluster ID" name="clusterId" onChange={this.handleInputChange}/>
        <input type="text" placeholder="Hive ID" name="hiveId" onChange={this.handleInputChange}/>
        <input className="btn" type="submit" value="Submit"/>
        <button className="btn" onClick={event => {
          this.props.onSubmit("demoCluster", "demoHive");
          event.preventDefault();
        }}>Use Demo Data
        </button>
      </form>
    );
  }
}