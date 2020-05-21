import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class DoughnutChart extends Component {
    constructor(){
        super()
    }

    componentWillReceiveProps(props){
        console.log('dfdfdfdfdf111:::::::', props)
    }

	render() {
        let indianRatio = this.props.nationalityData && this.props.nationalityData.indian *100/this.props.nationalityData.all;
        console.log('dfdfdfdfdf11122:::::::', indianRatio)

		const options = {
			animationEnabled: true,
			// subtitles: [{
			// 	text: "71% Positive",
			// 	verticalAlign: "center",
			// 	fontSize: 24,
			// 	dockInsidePlotArea: true
			// }],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: "Indian", y: indianRatio },
					{ name: "Foreigner", y: (100% - indianRatio) },
				]
			}]
		}
		
		return (
		<div>
            <span>Nationality</span>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default DoughnutChart;