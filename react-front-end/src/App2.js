
//import './App2.css';
import React from "react";
import Select from "react-dropdown-select";
import Chart from "./components/Chart";



export default class App2 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {Name: null, Start: null, Stop: null, Result: ""};
    this.getChartData();
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){ 
    //make our Ajax calls here
    this.setState({
        ChartData:{
          labels:['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        }
    });    
  }

  getQuery() {
    //In case we add more state
    return {
      Name: this.state.Name,
      Start: this.state.Start,
      Stop: this.state.Stop
    }
  } 

  async queryBackend(url) {
    console.log(url, this.getQuery())
    const res = await fetch(url, 
    { method: 'POST',
     body: JSON.stringify(this.getQuery()),
     headers: new Headers({'content-type': 'application/json'}) 
    })

    this.setState({Result: await res.text()})
  }

  genButtonFunction(url) {
    return () => {this.queryBackend.bind(this)(url)}
  }


  render () {
  
    const options = ["Bitcoin", "BinanceCoin", "Aave"].map((c) => ({"label": c, "value": c, }));

    return (
      <div className='resultStyle'>
           <h1 style={{color: "goldenrod"}}>Searching Calculation Results from the Data</h1>
          <p style={{color: 'white'}}>Instruction: You will select the the name of the crypto that you want Calculate.  Then you select the starting date and stoping date to get the range of the coin you select from the data set. After that now click on the calculation buttons to find the Volatility, Average Growth/Decline of the price, the moving average price, the average volume, ratio of marketcap to volume, or Average marketcap of the coin you selected. </p>
          <h3 style={{color: 'goldenrod'}}>Please Select The Name of Crypto</h3>
          <Select style={{ color: 'goldenrod'}} searchable options={options} onChange={(values) => {
            if (values.length > 0) {this.setState({Name: values[0].value})}
          }}  />

            <p style = {{textAlign: 'center', color: 'white'}}> Start Date
              <input type="date" onChange={(e) => this.setState({Start: e.target.value})}/> 
            
            </p>

            <p style = {{textAlign: 'center', color: 'white'}}> Stop Date
              <input type="date" onChange={(e) => this.setState({Stop: e.target.value})}/> 
            </p>

            <div style={{textAlign: 'center', color: 'blue'   }}>
            <button style={{textAlign: 'center', color: 'blue', backgroundColor: 'white'}} onClick={ this.genButtonFunction.bind(this)("http://localhost:8080/api/analytics/volatility") }> Calculating the Volatility </button>  
            </div>

            <div style={{textAlign: 'center', color: 'blue'   }}>
            <button style={{textAlign: 'center', color: 'blue', backgroundColor: 'white'}} onClick={ this.genButtonFunction.bind(this)("http://localhost:8080/api/analytics/growthdecline") }> Calculating both Average Growth/Decline </button>  
            </div>

            <div style={{textAlign: 'center', color: 'blue' }}>
            <button style={{textAlign: 'center', color: 'blue', backgroundColor: 'white'}} onClick={ this.genButtonFunction.bind(this)("http://localhost:8080/api/analytics/movingaverage") }> Calculate The Moving Average </button>  
            </div>

            <div style={{textAlign: 'center', color: 'blue',boxSizing: 'border-box' }}>
            <button style={{textAlign: 'center', color: 'blue', backgroundColor: 'white'}} onClick={ this.genButtonFunction.bind(this)("http://localhost:8080/api/analytics/avgvol") }> Calculate The Average Volume </button>  
            </div>
            
            <div style={{textAlign: 'center', color: 'blue',boxSizing: 'border-box' }}>
            <button style={{textAlign: 'center', color: 'blue', backgroundColor: 'white'}} onClick={ this.genButtonFunction.bind(this)("http://localhost:8080/api/analytics/capvolratio") }> Calculate The Ratio of MarketCap to Volume </button>  
            </div>

            <div style={{textAlign: 'center', color: 'blue',boxSizing: 'border-box' }}>
            <button style={{textAlign: 'center', color: 'blue', backgroundColor: 'white'}} onClick={ this.genButtonFunction.bind(this)("http://localhost:8080/api/analytics/avgcap") }> Calculate The Average MarketCap </button>  
            </div>

            <div style={{textAlign: 'center', color: 'blue' }}>
            {/*<button style={{textAlign: 'center', color: 'blue', backgroundColor: 'white'}} onClick={ this.genButtonFunction.bind(this)("http://localhost:8080/api/analytics/avgvol")}> Average Trading Rates </button>*/} 
            </div>
            
            <div style={{textAlign: 'center', color: 'blue' }}>
            {/*<button style={{textAlign: 'center', color: 'blue', backgroundColor: 'white'}} onClick={ this.genButtonFunction.bind(this)("http://localhost:8080/api/analytics/avgvol")}> MonthlyVolumeRatioCap </button>*/}
            </div>

            <div style={{textAlign: 'center', color: 'blue' }}>
            {/*<button style={{textAlign: 'center', color: 'blue', backgroundColor: 'white'}} onClick={ this.genButtonFunction.bind(this)("http://localhost:8080/api/analytics/avgvol")}> MostPopularCrytpo </button>*/}
            </div>
            
            {this.state.Result}
           {/* < Chart chartData={this.state.ChartData}/>*/}
      </div>)
  }
}
