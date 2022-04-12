import './App.css';
import {Data} from "./Data.js";
import React, { useState } from "react";
import Select from "react-dropdown-select";



function App() {
  const [search, setSearch] = useState(
    {
      coins: [],
      dateStart: null,
      dateStop: null,
      priceMin: null,
      priceMax: null,
      volumeMin: null,
      volumeMax: null,
      onlyLargest: false,
      color: null
    }
  )

  const options = ["Bitcoin", "BinanceCoin", "Aave"].map((c) => ({"label": c, "value": c, }));


  return (
    <div className="App">
      <header className="App-header">
        
        <div>
          <h2 style={{color: "gold"}}>Search Cryptocurrency from Data with Edit/Insert/Delete</h2>
          <p style={{color: 'gold'}}> Instruction: Please select the Cryptocurrency coin that you want to search for.  Then select the certain range of dates, value of the high price, and the Volume. </p>
          <p style={{color: 'white'}}>Please Select The Name of Cyrtpo</p>
          <Select multi searchable options={options} onChange={(values) => {
            setSearch({...search, coins: (values.map((o) => (o.label)))});
          }}  />


          <p> Date range </p>
          <p> Start
           <input type="date" onChange={(e) => setSearch({...search, dateStart: e.target.value})}/> 
          </p>
          <p> Stop
           <input type="date" onChange={(e) => setSearch({...search, dateStop: e.target.value})}/> 
          </p>

          <p> High price </p>
          <p> Min
           <input type="number" step=".001" onChange={(e) => setSearch({...search, priceMin: e.target.value})}/> 
          </p>
          <p> Max
           <input type="number" step=".001" onChange={(e) => setSearch({...search, priceMax: e.target.value})}/> 
          </p>

          <p> Volume </p>
          <p> Min
           <input type="number" step="1" onChange={(e) => setSearch({...search, volumeMin: e.target.value})}/> 
          </p>
          <p> Max
           <input type="number" step="1" onChange={(e) => setSearch({...search, volumeMax: e.target.value})}/> 
          </p>
          <h4 style={{color: 'gold'}}>Insert/Delete/Update</h4>
          <p style={{color: 'gold'}}>Instruction:  For the insert/update/delete their is a edit button on the right of data row that allows update and delete when clicked.  For Inesert new set of data will be located under the labels on the second row.  </p>
          <p style={{color: 'gold'}}> Once your are finish, inorder to save the you new insert/update please click on the botton 'Save Updates' below. </p>
          <button onClick={e => {
              fetch('http://localhost:8080/api/data/export', { method: 'POST'})
              .then(() => setSearch(search));
            }}>Save Updates</button>

          <Data search={search}/>
       </div>
      </header>
    </div>
  );
}

export default App;
