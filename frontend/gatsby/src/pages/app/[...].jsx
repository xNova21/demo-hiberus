import React from "react";
import { Router } from "@reach/router"
import Login from "../../components/Login";
import Register from "../../components/Register";
import Dashboard from "../../components/Dashboard";
import PrivateRoute from "../../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Router basepath="/app">
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Login path="/login" />
      <Register path="/register" />
    </Router>
  );
}
