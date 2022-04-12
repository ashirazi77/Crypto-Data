import React, {Component} from "react";
import {Line} from 'react-chartjs-2'; 

class SearchChart extends Component{  //need to import Chart from './components/Chart' in our main app(2) component
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
        }
    }

    componentWillUpdate() {
        if (this.state.chartData !== this.props.chartData) {
            this.setState({chartData:this.props.chartData})
        }
        
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend:true,
        legendPosition:'right',
        //Name:'Coin'
    }

    render(){
        console.log(this.state.chartData)

        const chartStyle = {
            backgroundColor: "white",
            pointBackgroundColor:'rgba(0, 19, 163, 0.8)',
            pointBorderColor:'rgba(0, 19, 163, 0.8)',
            borderColor:'rgba(0, 19, 163, 0.8)'
        }
        //the className = "Seachchart" we can add a style for it in app.css
        return (
            <div className= "SeachChart">
            <Line style={chartStyle} data={this.state.chartData} //takes in the data object, can be Bar or Line or Pie
                 //width={100}
                 //height={50}
                 
                 options={{
                     title:{
                         display:this.props.displayTitle,
                         text: 'Search Results',
                         fontSize:30,
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

export default SearchChart;