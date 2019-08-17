import React from 'react';
import Header from './components/header_footer/Header';
import HomePage from './components/home/HomePage'
import { Route, Switch, withRouter } from 'react-router-dom';



function App() {
  return (
    <div >
      <Switch>
        <Route exact path="/" component={Header} />
        <Route path="/home" component={HomePage} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
