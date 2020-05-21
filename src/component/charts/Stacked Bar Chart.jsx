import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
 
class BarChart extends Component {

	componentWillReceiveProps(props){
        console.log('tgs dfdfdfdfdf111:::::::', props)
	}

	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			axisX: {
				title: "Infected State",
				reversed: true,
			},
			axisY: {
				title: "Number of People Infected",
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				// dataPoints: [
				// 	{label: "Kerala", y: 52},
				// 	{label: "Delhi", y: 27},
				// 	{label: "Telangana", y: 22},
				// 	{label: "Rajasthan", y: 26},
				// 	{label: "Haryana", y: 18, x: 4},
				// 	{label: "Uttar Pradesh", y: 26},
				// 	{label: "Ladakh", y: 13},
				// ]
				dataPoints: this.props.data
			}]
		}
		return (
		<div>
			<span >States wise data</span>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default BarChart;