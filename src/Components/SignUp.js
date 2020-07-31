import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


export default function SignUp (props){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [band_name, setBandName] = useState("")
    const [number_of_members, setNumberofMembers] = useState("")
    const [lead_member, setLeadMember] = useState("")
    const [garuntee, setGaruntee] = useState("")

    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        let musician = {
            username,
            password,
            band_name,
            number_of_members,
            lead_member,
            garuntee
        }
        props.newsignUp(musician)
            .then(() => props.history.push('/home'))
    }

    const showAlerts = () => props.alerts.map(alert => <p>{alert}</p>)

    const handleChange = ({target}) => {
        return target.name === "username"
            ? setUsername(target.value) 
            : setPassword(target.value)
    }

    const handleBandName = ({target}) => {
        return target.name === "band-name"
        ? setBandName(target.value)
        : setNumberofMembers(target.value)
    }
    
    const handleLeadGaruntee = ({target}) => {
        return target.name === "lead-member"
        ? setLeadMember(target.value)
        : setGaruntee(target.value)
    }

    return(
        <form className='signup-form' onSubmit={handleSubmit}>
            <br></br>
            <h2>Sign Up!</h2>
            <label>Username</label>
            <input name="username" value={username} onChange={handleChange}/><br></br>
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={handleChange}/><br></br>
            <label>Band Name</label>
            <input name="band-name" value={props.band_name} onChange={handleBandName}/><br></br>
            <label>Number of Members</label>
            <input type="integer" name="number-of-members" value={props.number_of_members} onChange={handleBandName}/><br></br>
            <label>Lead Member</label>
            <input name="lead-member" value={props.lead_member} onChange={handleLeadGaruntee}/><br></br>
            <label>Minimum Garuntee $</label>
            <input name="minimum-garuntee" value={props.minimum_garuntee} onChange={handleLeadGaruntee}/><br></br>
            <input type="submit"/>
            {props.alerts ? showAlerts() : null}
            <Link to='/login'><p className="signUp">Login</p></Link>
        </form>
    )
}