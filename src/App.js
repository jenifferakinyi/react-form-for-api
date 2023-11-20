import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import LoginUser from './components/LoginUser';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
        {/* <Route exact path="/"><Home/></Route> */}
        <Route  path="/login"><Login/></Route>
        <Route  path="/signup"><Signup/></Route>
        <Route path="/dashboard"><Dashboard/> </Route>
        <Route path="/loginuser"><LoginUser/></Route>
        
      </Switch>
    </div>
    </Router>
  );
}

export default App;
