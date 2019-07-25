import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BeverageOrder from "./Components/BeverageOrderComponent/BeverageOrder";
import BeverageMenuQueue from "./Components/BeverageMenu&Queue/BeverageMenu&Queue";
import "./styles.css";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={BeverageOrder} exact={true} />
            <Route path="/BeverageQueue" component={BeverageMenuQueue} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
