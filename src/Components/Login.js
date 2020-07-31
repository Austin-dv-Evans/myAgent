import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


export default function Login (props){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        let musician = {
            username,
            password
        }
        props.login(musician)
            .then(() => props.history.push('/home'))
    }

    const showAlerts = () => props.alerts.map(alert => <p key={alert}>{alert}</p>)

    const handleChange = ({target}) => {
        return target.name === "username"
            ? setUsername(target.value) 
            : setPassword(target.value)
    }

    return(
        <form className='login-form' onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>Username</label>
            <input name="username" value={username} onChange={handleChange}/><br></br>
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={handleChange}/><br></br>
            <input type="submit"/>
            {props.alerts ? showAlerts() : null}
            <Link to='/signup'><p className="signUp">Sign Up</p></Link>
        </form>
    )
}
