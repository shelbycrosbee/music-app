import React from 'react';
import Header from './components/header_footer/Header';
import HomePage from './components/home/HomePage';
import PlayerPage from './components/player/PlayerPage';
import LoginPage from './components/login/LoginPage';
import { Route, Switch, withRouter } from 'react-router-dom';
import Footer from './components/header_footer/Footer';



function App() {
  return (
    <div >
      <Header />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/player" component={PlayerPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
