import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import LogoutPage from "./components/logout/LogoutPage";
import SignupPage from "./components/signup/SignupPage";
import TopBar from './components/layout/TopBar'
import EventsList from "./components/EventsList"
import EventDetails from './components/EventDetails';
import TicketDetails from './components/TicketDetails';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{marginTop:75}}>
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/tickets/:id" component={TicketDetails} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/" render={() => <Redirect to="/events" />} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
