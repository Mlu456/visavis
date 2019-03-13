import React, { Component } from 'react';
import * as actions from "../actions/actions";
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import other child components
import Login from '../components/Login.jsx';
import Home from '../components/Home.jsx';
import Header from '../components/Header.jsx';
import MatchDetails from '../components/MatchDetails.jsx';
import Signup from '../components/Signup.jsx';
import Settings from '../components/Settings.jsx'

// user refers to the user controller
const mapStateToProps = (store) => ({
  isLoggedIn: store.user.isLoggedIn,
  userInfo: store.user.userInfo,
  currentMatch: store.user.currentMatch,
  pastMatches: store.user.pastMatches,
  email: store.user.email,
  fullName: store.user.fullName,
  password: store.user.password,  
  matchChats: store.user.matchChats,
  // changeName: store.user.changeName,
})

const mapDispatchToProps = dispatch => ({
  userLogin: (email, password) => { dispatch(actions.userLogin(email, password)) },
  userSignup: (fullName, email, password) => { dispatch(actions.userSignup(fullName, email, password)) },
  enterEmail: (event) => { dispatch(actions.enterEmail(event.target.value)) },
  enterFullName: (event) => { dispatch(actions.enterFullName(event.target.value)) },
  enterPassword: (event) => { dispatch(actions.enterPassword(event.target.value)) },
  userLogout: (id) => { dispatch(actions.userLogout(id)) } ,
  getMatchChats: (matchId) => { dispatch(actions.getChats(matchId)) },
  changeName: (userInfo, fullName) => { dispatch(actions.changeNameInDb(userInfo, fullName)) }
})

// component did mount => post to login

class App extends Component {

  constructor(props) {
    super(props);
  }

  // add user email and log in to my state
  render() {
    const { userLogin, userSignup, userLogout,
      enterEmail, email, matchChats,
      enterPassword, password,
      enterFullName, fullName,
      userInfo, isLoggedIn, currentMatch, pastMatches, getMatchChats, changeName } = this.props;

    return (
      <Router>
        <div id='app'>
          <Route exact path="/" render={() => (!isLoggedIn ? <Redirect to="/login" />
            : <Home userInfo={userInfo} userLogout={userLogout} currentMatch={currentMatch} pastMatches={pastMatches} />)} />
          <Route path="/login" render={() => (<Login userLogin={userLogin} enterEmail={enterEmail} enterPassword={enterPassword} email={email} password={password} isLoggedIn={isLoggedIn} />)} />
          <Route path="/signup" render={() => (<Signup userSignup={userSignup} enterFullName={enterFullName} enterEmail={enterEmail} enterPassword={enterPassword} fullName={fullName} email={email} password={password} />)} />
          <Route path="/settings" render={() => (<Settings fullName={fullName} email={email} password={password} userInfo={userInfo} userLogout={userLogout} changeName={changeName} enterFullName={enterFullName} />)} /> 
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);