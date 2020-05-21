import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Header from './component/Header';
import Footer from './component/footer';

export default function Router_outlet() {
    return (
      <React.Fragment>
      <BrowserRouter>  
      <Header></Header>
        <Route path="/" component={Home}></Route>
        <Footer></Footer>
      </BrowserRouter>
      </React.Fragment>
    );
  }
