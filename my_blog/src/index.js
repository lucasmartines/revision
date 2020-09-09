import * as serviceWorker from "./serviceWorker";

import React from "react";
import ReactDOM from "react-dom";

import Metadata from "./context/Metadata.context";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./index.scss";

import FrontPage from "./pages/FrontPage/FrontPage.pages";
import Admin from "./pages/admin/AdminPosts.page";
import Navbar from './components/Navbar.components'
import MostrarUmPost from './pages/posts/MostrarUmPost.page'


ReactDOM.render(
  <Metadata>

      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={FrontPage} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/editar_post/:id"  component={Admin} />
          <Route path="/post/:id"  component={MostrarUmPost} />
        </Switch>
      </Router>

  </Metadata>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
