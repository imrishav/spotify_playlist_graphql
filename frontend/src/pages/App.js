import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header.component';
import Playlist from './Playlist';
import User from './User';
import Featured from './Featured';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={User} />
          <Route path="/playlist" exact component={Playlist} />
          <Route path="/featured" exact component={Featured} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
