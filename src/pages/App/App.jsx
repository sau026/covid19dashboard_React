import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
  import Home from '../Home/Home'
  import About from '../About/About'
  import Router_outlet from '../../app.routes';

class App extends React.Component {
    render(){
        return(
            <React.Fragment>
            <Router_outlet></Router_outlet>
            </React.Fragment>
        )
    }
}

export default App