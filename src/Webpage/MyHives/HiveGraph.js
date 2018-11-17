import React, {Component} from "react";
import {Line} from "react-chartjs-2";
import fields from "./fields.json";

export default class HiveGraph extends Component {
  render() {
    let title = "";
    if (fields[this.props.name]) {
      title = fields[this.props.name].label || "";
    }
    return (<Line
      height={100}
      data={{
        labels: this.props.xAxisData,
        datasets: [{
          label: title,
          data: this.props.yAxisData,
          backgroundColor: "#ffa502"
        }]
      }}
      options={{
        legend: null,
        title: {
          text: title,
          display: true,
          fontSize: 24
        }
      }}
    />)
  }
}