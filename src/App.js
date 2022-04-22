import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Join from "./component/Join/Join.js";
import Chat from "./component/Chat/Chat.js";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Join} />
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
