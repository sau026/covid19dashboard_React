import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ChartWithLogarithmicAxis extends Component {
  	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title: {
				text: "Growth of Photovoltaics"
			},
			axisY: {
				title: "Capacity (in MWp)",
				logarithmic: true,
				includeZero: false
			},
			data: [{
				type: "spline",
				showInLegend: true,
				legendText: "MWp = one megawatt peak",
				dataPoints: [
				  { x: 30, y: 161},
				  { x: 30, y: 206},
				  { x: 232323, y: 263},
				  { x: 2323, y: 372},
				  { x: 2323, y: 511}, 
				]
			}]
		}
		return (
		  <div className="ChartWithLogarithmicAxis">
			  <span>Cumulative Trend</span>
			<CanvasJSChart options = {options} />
		  </div>
		);
	}
}
 
export default ChartWithLogarithmicAxis;