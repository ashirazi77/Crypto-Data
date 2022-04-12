import React, {Component} from 'react';
import {Data} from "../Data.js";
import Select from "react-dropdown-select";
import {get_coins_list, post_export_changes, get_coin_records} from "../Api"
import { Record } from '../Record.js';

class Edit extends Component{  
    constructor (props) {
        super(props);
        this.state = { 'options': [], 'records': [] }
    }
    
    componentDidMount() {
        get_coins_list()
        .then( this.make_options )
        .then( options => this.setState({options}))
    }
    
    make_options(coins) {
        return coins.map((c) => ({"label": c, "value": c, }));
    } 

    load_records(coin) {
        get_coin_records(coin)
        .then(records => this.setState({records}))
    }

    render(){
        const tableStyle = {
            "borderWidth":"1px", 
            'borderColor':"black", 
            'borderStyle':'solid',
            
            flexdirection: 'column',
            textAlign: "center",
            justifycontent: 'center'
        }

        return (
            <div style={{textAlign:'center'}}>
                <p></p>
                <Select searchable options={this.state.options} onChange={(values) => {this.load_records(values[0].value)}}  />
                
                <button onClick={e => {
                    post_export_changes()
                    .then(() => this.setState());
                  }}>Save Updates</button>

                <table style ={tableStyle}>
                    {this.state.records.map( record => <Record item={record}/> )}
                </table>

                
            </div>
        )
    }
}

/* In our app function */

export default Edit;