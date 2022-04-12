import React, { useEffect, useState } from "react";
import {Record } from "./Record.js";

export const Data = ( search ) => {

  const {coins,
    dateStart,
    dateStop,
    priceMin,
    priceMax,
    volumeMin,
    volumeMax,
    onlyLargest } = search.search;

  const [data, setData] = useState({});

    
  const [newRecord, setNewRecord] = useState(
    { Name: null, Symbol: null, Date: null, High: null } 
  )


  const loadData = async () => {
    try {
      var url = new URL("http://localhost:8080/api/search/search")

      Object.entries(search.search).forEach( ([k, v]) => {
        if (v != null) {
          console.log(k,v);
          url.searchParams.set(k, v);
        }
      });

      console.log(url);
      const res = await fetch(url);
      setData(await res.json());
    } catch (error) {
      console.log(error);
      return <p>{error}</p>
    }
    
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, [search]);
  
  const empty = (data["result"] === undefined) 

  return (
  <div>
    <table >
    <tr>

      <th className='tableStyle'> Name</th>
      <th className='tableStyle'> Symbol</th>
      <th className='tableStyle'> High Price Value</th>
      <th className='tableStyle'> Volume</th>
      <th className='tableStyle'> Marketcap</th>
      <th className='tableStyle'> Date</th>
      
    </tr>

    <tr>

      <th className='thStyle'>
        <input type="text" onChange={(e) => setNewRecord({...newRecord, Name: e.target.value})}/> 
      </th>
      <th className='thStyle'> 
        <input type="text" onChange={(e) => setNewRecord({...newRecord, Symbol: e.target.value})}/> 
      </th>
      <th className='thStyle'> 
        <input type="number" step="1" onChange={(e) => setNewRecord({...newRecord, High: e.target.value})}/> 
      </th>
      <th className='thStyle'> 
        <input type="number" onChange={(e) => setNewRecord({...newRecord, Volume: e.target.value})}/> 
      </th>
      <th className='thStyle'> 
        <input type="number" onChange={(e) => setNewRecord({...newRecord, Marketcap: e.target.value})}/> 
      </th>
      <th className='thStyle'> 
        <input type="date" onChange={(e) => setNewRecord({...newRecord, Date: e.target.value})}/> 
      </th>
      <th>
        <button onClick={e => {
          fetch('http://localhost:8080/api/data/create', 
          { method: 'POST',
            body: JSON.stringify(newRecord),
            headers: new Headers({'content-type': 'application/json'}) 
          })
        }}>Add a new price record</button>
      </th>

    </tr>

    {empty ? 
      <p>no results found</p> 
    : data["result"].map(item =>  <Record item={JSON.parse(item)}/> )}

    </table>
  </div>);
};