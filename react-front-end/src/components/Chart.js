import React, {Component} from "react";
import {Bar, Line, Pie} from 'react-chartjs-2';  //the usage for charts

/*need to run this in terminal:
   npm install react-chartjs-2 chart.js --save
*/


/************************************************************************ 
this comment is for the app file that will use the chart

Add chartData:{} in the constructor(props){this.state={__right_here__}} for the App2 file 

componentWillMount(){
    this.getChartData();
}

getChartData(){ 
    //make our Ajax calls here
    this.setState({
        ChartData{
            labels:['bitcoin']
        }
        datasets:[
            {
                label:'price'
                data[]
            }
        ]
    })
}

in the render(){ 
    return(
        <div>
            //add chart here
            <Chart chartData={this.stat.chartData} />
        </div>
    )
} 

****************************************************************************/

class Chart extends Component{  //need to import Chart from './components/Chart' in our main app(2) component
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend:true,
        legendPosition:'right',
        //Name:'Coin'
    }

    render(){
        return (
            <div className= "Chart">
            <Line data={this.state.chartData} //takes in the data object, can be Bar or Line or Pie
                 //width={100}
                 //height={50}
                 options={{
                     title:{
                         display:this.props.displayTitle,
                         text: 'Average growth of a Coin',
                         fontSize:30
                     },
                     legend:{
                         display:this.props.displayLegend,
                         position:this.props.legendPosition
                     }
                 }}
            />
            </div>
        )
    }
}

/* In our app function */

export default Chart;