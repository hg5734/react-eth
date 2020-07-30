
import React from 'react'
import { Redirect } from 'react-router-dom'
import { AuthSevice } from "../../services/auth.service";

class ProtectedRoute extends React.Component<any> {

    render() {
        const Component = this.props.component;
        let isAuthenticated = AuthSevice.getUserData()
        return isAuthenticated ? (
            <Component />) : (<Redirect to={{ pathname: '/login' }} />);
    }
}

export default ProtectedRoute;