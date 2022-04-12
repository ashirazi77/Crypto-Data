import React from 'react';
import ReactDOM from 'react-dom';
//import cryptoBackground from'/root/cs180project-021-team-surf/react-front-end/src/images/btcpic.pdf';
import './index.css';
import App from './App';
import App2 from './App2';
import Edit from './pages/Edit';
import Search from './pages/Search';
import Select from "react-dropdown-select";


class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { currentPage: <div/> };
  }

  switchPage(currentPage){
    this.setState({currentPage});
  };


  render(){
    const pageStyle = {
      //backgroundColor: "white",
      backgroundImage: `url("https://cdn.discordapp.com/attachments/894683699545788529/910735949728718868/darkcyrpto.png")`,
      backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '99vw',
        height: '100vh',
      textAlign: 'center', 
      color: 'white'
    }
    
    //"Edit App" : <Edit/>,
    const pages = {
      "Search/Edit App" : <App/> ,
      "Quick Results App" : <App2/>,
      "Charts/Graph": <Search/> }

    const options = 
      Object
      .keys(pages)
      .map( 
        (k) => 
        ({"label": k, "value": pages[k] }));
      /*returns this ==> options = [{"label": "Search App", "value": <App/>}, {" ", " "}]
       <div style={{backgroundImage:'btcpic.p'}}> line 47*/

    return(
        <div style={pageStyle}>
            <h2 style={{color: 'white', width: 'auto', height: 'auto', textAlign: 'center'}}>Select What Kind Of Data You Want To See</h2>

            <Select searchable options={options} onChange={(values) => { this.setState({ currentPage: values[0].value})}}  />

            { this.state.currentPage }
        </div>
    );
  }
}


ReactDOM.render(
  <React.StrictMode>
  <MainPage/>

  </React.StrictMode>,
  document.getElementById('root')
);