import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class StackedColumnChart extends Component {
	constructor() {
		super();
		this.state = {
			hossData: ''
		}
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}

	componentWillReceiveProps(props){
    }

	componentDidMount(){
		
	}

	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {		
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			axisY: {
				// title: "in Eur",
				// prefix: "€",
				// suffix: "k"
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [
			{
				type: "stackedColumn",
				name: "General",
				showInLegend: true,
				yValueFormatString: "#,###k",
				dataPoints: [
					{ label: "30 Jan 2020", y: 14 },
					{ label: "Feb", y: 12 },
					{ label: "Mar", y: 14 },
					{ label: "Apr", y: 13 },
					{ label: "May", y: 13 },
					{ label: "Jun", y: 13 },
					{ label: "Jul", y: 14 },
					{ label: "Aug", y: 14 },
					
				]
			},
			{
				type: "stackedColumn",
				name: "Marketing",
				showInLegend: true,
				yValueFormatString: "#,###k",
				dataPoints: [
					{ label: "30 Jan 2020", y: 14 },
					{ label: "Feb", y: 13 },
					{ label: "Mar", y: 15 },
					{ label: "Apr", y: 16 },
					{ label: "May", y: 17 },
					{ label: "Jun", y: 17 },
					{ label: "Jul", y: 18 },
				]
			},
			{
				type: "stackedColumn",
				name: "Sales",
				showInLegend: true,
				yValueFormatString: "#,###k",
				dataPoints: [
					{ label: "30 Jan 2020", y: 14 },
					{ label: "Feb", y: 13 },
					{ label: "Mar", y: 15 },
					{ label: "Apr", y: 15 },
					{ label: "May", y: 15 },
					{ label: "Jun", y: 15 },
					{ label: "Jul", y: 16 },
			]
			}]
		}
		
		return (
		<div>
			<h1>React Stacked Column Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StackedColumnChart;