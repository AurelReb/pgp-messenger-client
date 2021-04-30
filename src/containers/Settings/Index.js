import React from "react";
import Profile from "./components/Profile";
import {Route } from 'react-router'


export default function UserSettings() {

  return (
  <Route exact path="/settings">
    <Profile />
  </Route>
  );
}
