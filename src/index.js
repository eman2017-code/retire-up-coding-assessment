import React from "react";
import ReactDOM from "react-dom";

//COMPONENT IMPORTS
import LandingPage from "./components/LandingPage/LandingPage";

//REDUCERS
import reducers from "./reducers";

//REDUX
import { Provider } from "react-redux";
import { createStore } from "redux";
const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <LandingPage />
  </Provider>,
  document.getElementById("root")
);
