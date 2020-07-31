import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import './App.css';

import Documents from './Components/Documents'
import Nav from './Components/Nav'
import AddGigForm from './Components/AddGigForm'
import Home from './Components/Home'
import { patchGig, deleteGig, postGig } from './Helpers'
import PrivateRoute from './Components/PrivateRoute';
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import GigContainer from './Components/GigContainer';
const musiciansUrl = 'http://localhost:3000/musicians'
const gigsUrl = 'http://localhost:3000/gigs'


class App extends React.Component {
  
  state = {
    musicians: {},
    gigs: [],
    alerts: []
  }

  componentDidMount(){
    if(localStorage.token){
      this.authorize_musician()
    }
  }

  authorize_musician = () => {
    fetch("http://localhost:3000/profile",{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        musicians: response.musicians,
        gigs: response.gigs
      })
    })
  }
 
  addGig = (newGig) => {
    this.setState({
      gigs: [...this.state.gigs, newGig]
    })
    postGig(newGig)
  }

  updateGig = (updatedGig) => {
    let gigs = this.state.gigs.map(gig => gig.id === updatedGig.id ? updatedGig : gig)
    this.setState({gigs})
    patchGig(updatedGig)
  }

  destroyGig = (gig) => {
    let filtered = this.state.gigs.filter(gig => gig.id !== gig)
    this.setState({
      gigs: filtered
    })
    deleteGig(gig.id)
  }

  newsignUp = (musician) => {
    return fetch("http://localhost:3000/musicians", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({musician})
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        this.setState({alerts: response.errors})
      }
      else {
        localStorage.setItem('token', response.token)
        this.setState({
          musicians: response.musician,
          alerts: ["MyAgent is here to serve you"],
          gigs: response.gigs
        })
      }
    })
  }

  login = ({username, password}) => {
    return fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({username, password})
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        this.setState({alerts: response.errors})
      }
      else {
        localStorage.setItem('token', response.token)
        this.setState({
          musicians: response.musician,
          alerts: ["Successful Login"],
          gigs: response.gigs
        })
      }
    })
  }

  render(){
    return (
        <div className="App">
          <Nav />
          <header className="title">MyAgent </header>
          {this.state.musicians.name
          ? (
            <>
              <p className="welcomeBack">Welcome back {this.state.musicians.name}</p> 
                <Link to="/" className="logoutbutton">Logout</Link>
            </>
            )
          : null}
        <Switch>
          <PrivateRoute
            exact
            path="/home"
            component={Home}
            newsignUp={this.newsignUp}
            login={this.login}
            musicians={this.state.musicians}
            alerts={this.state.alerts}
            gigs={this.state.gigs}
            submitAction={this.addGig}
            key={this.state.gigs.id}
            destroyGig={this.destroyGig}
            />
          <Route exact path="/signUp" render={(routerProps) => {
            return <SignUp {...routerProps} newsignUp={this.newsignUp} alerts={this.state.alerts} musicians={this.state.musicians}/>} 
            }/>
          <Route exact path="/" render={(routerProps) => {
            return <Login {...routerProps} login={this.login} alerts={this.state.alerts}/>} 
            }/>
          <PrivateRoute
            exact
            path="/addGigForm"
            component={AddGigForm}
            musicians={this.state.musicians}
            alerts={this.state.alerts}
            gigs={this.state.gigs}
            submitAction={this.addGig}
            key={this.state.gigs.id}
            />
          <PrivateRoute
            exact
            path="/docs"
            component={Documents}
            musicians={this.state.musicians}
            gigs={this.state.gigs}
            key={this.state.gigs.id}
            />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;