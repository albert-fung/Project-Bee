import React from 'react';

export default class ClusterHiveForm extends React.Component {
    constructor(props) {
        super(props);
        this.clusterId= React.createRef();
        this.hiveId = React.createRef();
    }

    render() {
        return(
            <form className="row-center" onSubmit={event => {
                this.props.onSubmit(this.clusterId.current.value, this.hiveId.current.value);
                event.preventDefault();
            }}>
                <input ref={this.clusterId} type="text" placeholder="Cluster ID"/>
                <input ref={this.hiveId} type="text" placeholder="Hive ID"/>
                <input className="btn" type="submit" value="Submit"/>
                <button className="btn" onClick={event => {
                    this.props.onSubmit("demoCluster", "demoHive");
                    event.preventDefault();
                }}>Use Demo Data</button>
            </form>
        );
    }
}