import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import routes from './routes';
import './App.css';
import store from './redux/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div 
      className="App">

      {routes}
      
      </div>
    </Router>
    </Provider>
  );
}

export default App;
