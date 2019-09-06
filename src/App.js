import React from 'react';
import Header from './components/header_footer/Header';
import HomePage from './components/home/HomePage';
import PlayerPage from './components/player/PlayerPage';
import LoginPage from './components/login/LoginPage';
import { Route, Switch, withRouter } from 'react-router-dom';
import Footer from './components/header_footer/Footer';
import PlaylistPage from './components/playlists/PlaylistPage';
import Bio from './components/bios/Bio'
import './index.css'


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/player" component={PlayerPage} />
        <Route path="/playlists" component={PlaylistPage} />
        <Route path='/about' component={Bio} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
