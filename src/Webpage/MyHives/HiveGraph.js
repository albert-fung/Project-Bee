import React, {Component} from "react";
import {Line} from "react-chartjs-2"

export default class HiveGraph extends Component {
  render() {
    return (<Line
      legend={null}
      height={100}
      data={{
        labels: this.props.xAxisData,
        datasets: [{
          label: this.props.title,
          data: this.props.yAxisData
        }]
      }}/>)
  }
}