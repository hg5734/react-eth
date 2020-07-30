import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginComponent from "../components/pre-auth/login";
import DashboardComponent from "../components/dashboard";
import NotFoundComponent from "../components/common/notfound";
import ProtectedRoute from '../components/common/protected';

class Routes extends React.Component<any> {
  
  render() {
    return (
      <div >
        <Switch>  
          <Route path="/login" component={LoginComponent}/>
          <ProtectedRoute path="/app/dashboard" component={DashboardComponent} />
          <ProtectedRoute path="/404" component={NotFoundComponent} />
          <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}

export default Routes;
