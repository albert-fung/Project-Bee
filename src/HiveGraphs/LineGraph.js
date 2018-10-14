import React from 'react';
import Chart from 'chart.js';

export default class LineGraph extends React.Component {

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidUpdate = () => {
        const canvas = this.canvas.current;
        const context = canvas.getContext("2d");
        new Chart(context, {
            type: 'line',
            data: {
                labels: this.props.xAxisData,
                datasets: [{
                    label: this.props.title,
                    data: this.props.yAxisData
                }]
            }
        });
    };
    render() {
        console.count("Render");
        return(
            <div className="graph">
                <h2>{this.props.title}</h2>
                <canvas ref={this.canvas} />
            </div>
        );
    }
}