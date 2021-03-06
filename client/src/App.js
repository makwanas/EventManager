import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import EventList from './components/EventList';
import EventModal from './components/eventModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }


  render() {
    return (
      <div className="containerStyle">
        <Provider store={store} >
          <div className="App">

            <AppNavbar />
            <Container>
              <EventModal />
              <EventList />
            </Container>
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
