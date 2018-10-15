import React from 'react';
import './HiveGraphs.css';
import ClusterHiveForm from './ClusterHiveForm.js'
import LineGraph from './LineGraph.js'
import firebase from '../Firebase.js'

export default class HiveGraphs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time: [],
            temperature: [],
            humidity: []
        }
    }

    updateGraphs = async (clusterId, hiveId) => {
        const measurements = await HiveGraphs.getMeasurements(clusterId, hiveId);
        measurements.splice(48);
        this.setState({
            time: measurements.map(m => new Date(1000 * m.time)),
            temperature: measurements.map(m => m.temperature),
            humidity: measurements.map(m => m.humidity)
        });
    };

    static async getMeasurements(clusterId, hiveId) {
        const MONTHLY_MEASUREMENTS = 31 * 24 * 2;

        const database = firebase.database();
        const ref = database.ref(`measurements/${clusterId}/${hiveId}`);

        const snapshot = await ref.orderByChild('time')
            .limitToLast(MONTHLY_MEASUREMENTS)
            .once("value");
        const data = snapshot.val();
        return data ? Object.values(data) : [];
    }

    static formatDateForDaily(date) {
        return `${date.getHours()}:${date.getMinutes()}`;
    }

    render() {
        return(
            <div>
                <ClusterHiveForm onSubmit = {this.updateGraphs}/>
                <div className="row-center">
                    <LineGraph title="Temperature" xAxisData={this.state.time.map(HiveGraphs.formatDateForDaily)} yAxisData={this.state.temperature}/>
                    <LineGraph title="Humidity" xAxisData={this.state.time.map(HiveGraphs.formatDateForDaily)} yAxisData={this.state.humidity}/>
                </div>
            </div>
        );
    }
}