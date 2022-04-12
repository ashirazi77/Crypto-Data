
import React from "react";


export class Record extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hidden: false, editing: false, update: { Name: props.item.Name, SNo: props.item.SNo } };
  }

  deleteClicked() {
    fetch('http://localhost:8080/api/data/delete', 
    { method: 'POST',
     body: JSON.stringify(this.state.update),
     headers: new Headers({'content-type': 'application/json'}) 
    })
    .then(() => this.setState({hidden: !this.state.hidden}));
  }

  updateClicked() {
    fetch('http://localhost:8080/api/dasta/update', 
    { method: 'POST',
      body: JSON.stringify(this.state.update),
      headers: new Headers({'content-type': 'application/json'}) 
     })
    .then(() => this.setState({editing: false}));
  }
  
//Number(item.High).toFixed(2
  render() {
    const item = this.props.item;

    if (this.state.hidden) return [];

    return [
      <tr key={item.SNo}>
        <td className='thStyle'>{item.Name} </td>
        <td className='thStyle'>{item.Symbol} </td>
        <td className='thStyle'>{Number(item.High).toFixed(2)} </td>
        <td className='thStyle'>{item.Volume} </td>
        <td className='thStyle'>{item.Marketcap} </td>
        <td className='thStyle'>{item.Date} </td>
        <td className='thStyle'>
          <button onClick={e => this.setState({editing: !this.state.editing})}>
            Edit
          </button>
        </td>
      </tr>,
      this.state.editing ? 
        <tr key={item.SNo + "editor"}>

          <td className='space_btw'>
            <input type="text" onChange={(e) => this.setState({update: {...this.state.update, Name: e.target.value}})}/> 
          </td>
          <td className='space_btw'> 
            <input type="text" onChange={(e) => this.setState({update: {...this.state.update, Symbol: e.target.value}})}/> 
          </td>
          <td className='space_btw'> 
            <input type="number" step="1" onChange={(e) => this.setState({update: {...this.state.update, High: e.target.value}})}/> 
          </td>
          <td className='space_btw'> 
            <input type="number" onChange={(e) => this.setState({update: {...this.state.update, Volume: e.target.value}})}/> 
          </td>
          <td className='space_btw'> 
            <input type="number" onChange={(e) => this.setState({update: {...this.state.update, Marketcap: e.target.value}})}/> 
          </td>
          <td className='space_btw'> 
            <input type="date" onChange={(e) => this.setState({update: {...this.state.update, Date: e.target.value}})}/> 
          </td>
          <td>
            <button onClick={ this.deleteClicked.bind(this) }> Delete </button>
          </td>
          <td className='space_btw'>
          <button onClick={ this.updateClicked.bind(this) }>Update</button>
          </td>
        </tr>
        : null
      ]
  
  }
}
