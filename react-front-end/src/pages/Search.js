import React, {Component} from 'react';
import SearchChart from "../components/SearchChart";
import Select from "react-dropdown-select";
import {get_coins_list, post_export_changes, get_coin_records} from "../Api"
import {Line} from 'react-chartjs-2'; 


class Search extends Component{  
    constructor (props) {
        super(props);
        this.state = { 'options': [], 'records': [], chartData: {labels:[],datasets:[]}, window: 30 }
    }
    
    componentDidMount() {
        get_coins_list()
        .then( this.make_options )
        .then( options => this.setState({options}))
    }
    
    make_options(coins) {
        return coins.map((c) => ({"label": c, "value": c, }));
    } 

    moving_average(data, window){

        
          let index = window - 1;
          const length = data.length + 1;
        
          const average = [];
        
          while (++index < length) {
            const windowSlice = data.slice(index - window, index);
            const sum = windowSlice.reduce((prev, curr) => prev + curr, 0);
            average.push(sum / window);
          }
        
          return average;
    }

    async get_records(coins) {
        if (coins.length == 0) { return }
        const coins_records = await Promise.all( coins
        .map( coin => get_coin_records(coin)))
        this.setState({'records': coins_records} )
        this.load_records()
    }

    async load_records(){
        
        const coins_records = this.state.records

        const labels =  coins_records[0].map( record => record.Date )
      
        const datasets =  coins_records.map(  coin_records => (  {
            label: coin_records[0].Name + "High",
            data: coin_records.map(record =>  Number(record.High)) 
            ,yAxisID: "y",
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',

            ],
        }))

        const lows_datasets =  coins_records.map(  coin_records => (  {
            label: coin_records[0].Name + "Low",
            data: coin_records.map(record =>  Number(record.Low)) 
            ,yAxisID: "y",
            backgroundColor: [
                'rgba(216, 197, 22, .5)',
            ],
            borderColor: [
                'rgba(216, 197, 22, 1)',
            ],
        }))

        const volume_datasets = coins_records.map(  coin_records => (  {
            label: coin_records[0].Name + " Volume",
            data: coin_records.map(record =>  Number(record.Volume)),
            yAxisID: "volume",
            backgroundColor: [
                'rgba(0, 19, 163, .5)',
            ],
            borderColor: [
                'rgba(0, 19, 163, 1)',
            ],
        }))


        datasets.push(... volume_datasets, ... lows_datasets) 

        const moving_averages = datasets.map( dataset => 
            ({
                label: dataset.label + " Moving Average",
                data: this.moving_average(dataset.data, this.state.window),
                yAxisID: dataset.yAxisID,
                backgroundColor: [
                    'rgba(75, 192, 192, .5)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],

            })
        )

        datasets.push(... moving_averages) 


        const chartData  = {
            labels,
            datasets,  
        
        }
        console.log(chartData)
        this.setState({ chartData})
    }

    render(){
        const options = {scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              Color: 'rgba(0, 19, 163, 0.8)',
              borderColor: 'rgba(0, 19, 163, 0.8)'
            },
            volume: {
              type: 'linear',
              display: true,
              position: 'right',
              Color: 'rgba(0, 19, 163, 0.8)',
              borderColor: 'rgba(0, 19, 163, 0.8)'
            }}}

        return (
            <div >
                <p style={{Color: "gold"}}>Insert the Number Period</p>
                <input type="number" step="1" onChange={(e) => {this.setState({window: e.target.value}); this.load_records()}}/> 

                <Select multi searchable options={this.state.options} onChange={(values) => {this.get_records(values.map(v => v.value))}}  />

                <Line style={{background: 'white'}}  data={this.state.chartData} option={options}/>
            </div>
        )
    }
}

/* In our app function */

export default Search;
