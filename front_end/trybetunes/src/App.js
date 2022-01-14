import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Loading from './pages/Loading';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route exact path="/" component={ Login } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/search" component={ Search } />
            <Route path="/loading" component={ Loading } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="/profile" component={ Profile } />
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
