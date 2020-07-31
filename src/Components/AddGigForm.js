import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'

export default class AddGigForm extends Component {
    state = {
        venue_name: "",
        date_time: "",
        offer: 0,
        accepted: false,
        paid: false,
        musician_id: this.props.musicians.id,
    }

    handleChange = (event) => {
        let {name, value, checked} = event.target

        value = (name === "accepted") || (name === "paid") ? checked : value
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitAction(this.state)
        if(this.props.handleToggle){
            this.props.handleToggle()
        }
    }
    
    showCheckboxes = () => {
        return this.props.gig
        ? (
        <div className="input-group">
            <label>Accepted</label>
            <input type="checkbox" name="accepted" checked={this.accepted} onChange={this.handleChange}/>
            <label>Paid</label>
            <input type="checkbox" name="paid" checked={this.paid} onChange={this.handleChange}/>
        </div>
        ) : null
    }

    render(){
        const {venue_name, date_time, offer, accepted, paid} = this.state
        return(
            <form className="addGigForm" onSubmit={this.handleSubmit}>
                <h1>Add a New Gig</h1>
                <label>Venue Name</label>
                <input type="text" name="venue_name" value={venue_name} onChange={this.handleChange}/><br></br>
                <label>Date and Time </label>
                <input type="text" name="date_time" value={date_time} onChange={this.handleChange} placeholder="ex.08-15-2020 7pm"/><br></br>
                <label>Offer: $</label>
                <input type="integer" name="offer" value={offer} onChange={this.handleChange}/>
                <div className="input-group">
                    <label>Accepted?</label>
                    <input type="checkbox" name="accepted" checked={accepted} onChange={this.handleChange}/>
                    <label>Paid?</label>
                    <input type="checkbox" name="paid" checked={paid} onChange={this.handleChange}/>
                </div>
                {this.showCheckboxes()}
                <input type="submit"/>
            </form>
        )
    }
}
