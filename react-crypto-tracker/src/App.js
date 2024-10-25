import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Homepage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import AuthForm from "./components/AuthForm";
import "./App.css";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Set authentication status to false
  };

  return (
    <Router>
      <div className={classes.App}>
        <Header onLogout={handleLogout} /> {/* Pass handleLogout to Header */}
        <Switch>
          <Route path="/" exact>
            {isAuthenticated ? <Homepage /> : <Redirect to="/login" />}
          </Route>

          <Route path="/login" exact>
            {isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <AuthForm onAuthSuccess={handleAuthSuccess} />
            )}
          </Route>

          <Route path="/coins/:id" exact>
            {isAuthenticated ? <CoinPage /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
